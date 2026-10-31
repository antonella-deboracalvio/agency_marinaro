import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { BodyTimeoutError, createFormLimiter, readFormJson, siteOrigin } from "../server/form-security.js";
import { createContactHandler } from "../server/contact-handler.js";
import { createCareersHandler } from "../server/careers-handler.js";
import { hasPublishedPrivacy } from "../src/data/legal.js";
import { securityHeaders } from "../server/security-headers.js";

const env = { SITE_URL: "https://studio.example", PRIVACY_NOTICE_VERSION: "2026-10-v1", RESEND_API_KEY: "test-only", MAIL_FROM: "Studio <site@example.com>", MAIL_TO: "owner@example.com" };
const inquiry = { services: ["web"], timing: "Da definire insieme", message: "Una richiesta di prova valida.", name: "Persona Test", email: "person@example.com", company: "", phone: "", website: "", requestId: "11111111-2222-4333-8444-555555555555", privacyNoticeVersion: env.PRIVACY_NOTICE_VERSION };
const application = { role: "sviluppo", collaboration: "Freelance / a progetto", experience: "Sto iniziando", availability: "Da concordare", portfolio: "", pitch: "Un profilo di prova con un testo valido.", name: "Persona Test", email: "person@example.com", website: "", requestId: inquiry.requestId, privacyNoticeVersion: env.PRIVACY_NOTICE_VERSION };
const request = (path, data, headers = {}) => new Request(env.SITE_URL + path, { method: "POST", headers: { origin: env.SITE_URL, "content-type": "application/json", ...headers }, body: typeof data === "string" ? data : JSON.stringify(data) });

test("origins are explicit: no Host-header fallback or insecure production origin", () => {
  for (const value of [undefined, "", "http://public.example", "https://user:pass@studio.example", "https://studio.example/path", "https://studio.example?query", "https://studio.example#hash"]) assert.equal(siteOrigin(value), null);
  assert.equal(siteOrigin("https://studio.example"), env.SITE_URL);
  assert.equal(siteOrigin("http://localhost:5173"), "http://localhost:5173");
});

test("chunked and slow bodies are bounded without trusting Content-Length", async () => {
  const oversized = new Request(env.SITE_URL, { method: "POST", body: new ReadableStream({ start(c) { c.enqueue(new Uint8Array(20)); c.close(); } }), duplex: "half" });
  await assert.rejects(readFormJson(oversized, 10), RangeError);
  let cancelled = false;
  const slow = new Request(env.SITE_URL, { method: "POST", body: new ReadableStream({ cancel() { cancelled = true; } }), duplex: "half" });
  await assert.rejects(readFormJson(slow, 100, 20), BodyTimeoutError);
  assert.equal(cancelled, true);
  assert.deepEqual(await readFormJson(request("/", { text: "caffè" }), 100), { text: "caffè" });
});

test("unapproved/mismatched privacy notices and cross-site requests never send", async () => {
  for (const [create, path, data] of [[createContactHandler, "/api/contact", inquiry], [createCareersHandler, "/api/careers", application]]) {
    let calls = 0;
    const fetchImpl = async () => { calls++; return Response.json({ id: "test-accepted" }); };
    assert.equal((await create({ env: { ...env, PRIVACY_NOTICE_VERSION: "" }, fetchImpl })(request(path, data))).status, 503);
    const handler = create({ env, fetchImpl });
    assert.equal((await handler(request(path, { ...data, privacyNoticeVersion: "old" }))).status, 409);
    assert.equal((await handler(request(path, data, { "sec-fetch-site": "cross-site" }))).status, 403);
    assert.equal((await handler(request(path, data, { "content-encoding": "gzip" }))).status, 415);
    assert.equal(calls, 0);
    assert.equal((await handler(request(path, data))).status, 200);
    assert.equal(calls, 1);
  }
});

test("invalid bodies count towards the early IP limit, and the window expires", async () => {
  let time = 0;
  const handler = createContactHandler({ env, now: () => time, fetchImpl: () => assert.fail("No email expected") });
  for (let i = 0; i < 20; i++) assert.equal((await handler(request("/api/contact", "{bad"), { ip: "test-ip" })).status, 400);
  assert.equal((await handler(request("/api/contact", "{bad"), { ip: "test-ip" })).status, 429);
  time = 600001;
  assert.equal((await handler(request("/api/contact", "{bad"), { ip: "test-ip" })).status, 400);
  const limit = createFormLimiter(() => time);
  for (let i = 0; i < 4096; i++) assert.equal(limit("ip", i, 20), 0);
  assert.equal(limit("ip", "new-key", 20), 60);
});

test("a notice must be a local reviewed publication, never an arbitrary URL", () => {
  assert.equal(hasPublishedPrivacy(), false);
  for (const path of ["//third-party.example", "https://third-party.example", "/../secret", "/privacy?token=x", "javascript:alert(1)"]) assert.equal(hasPublishedPrivacy({ privacyNoticeUrl: path, privacyNoticeVersion: "v1" }), false);
  assert.equal(hasPublishedPrivacy({ privacyNoticeUrl: "/privacy.html", privacyNoticeVersion: "v1" }), true);
});

test("production header configurations agree and block scripts/frames from third parties", () => {
  const vercel = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8"));
  assert.deepEqual(Object.fromEntries(vercel.headers[0].headers.map(h => [h.key, h.value])), securityHeaders);
  const netlify = readFileSync(new URL("../public/_headers", import.meta.url), "utf8");
  const apache = readFileSync(new URL("../public/.htaccess", import.meta.url), "utf8");
  for (const [key, value] of Object.entries(securityHeaders)) { assert(netlify.includes(`${key}: ${value}`)); assert(apache.includes(`Header always set ${key} "${value}"`)); }
  const csp = securityHeaders["Content-Security-Policy"];
  for (const value of ["script-src 'self'", "frame-ancestors 'none'", "frame-src 'none'", "connect-src 'self'", "object-src 'none'"]) assert(csp.includes(value));
  assert(!csp.includes("unsafe-eval"));
});
