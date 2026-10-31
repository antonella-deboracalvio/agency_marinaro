import test from "node:test";
import assert from "node:assert/strict";
import { createCareersHandler } from "../server/careers-handler.js";
import { sendApplication } from "../src/lib/send-application.js";

const env = { PRIVACY_NOTICE_VERSION: "test-notice-v1", RESEND_API_KEY: "test-key-never-send", MAIL_FROM: "Studio <site@example.com>", MAIL_TO: "team@example.com", SITE_URL: "https://studio.example.com" };
const data = { role: "sviluppo", collaboration: "Freelance / a progetto", experience: "1–3 anni", availability: "Da subito", portfolio: "github.com/example", pitch: "Creo siti accessibili con React e curo lo sviluppo delle interfacce.", name: "Persona di prova", email: "candidate@example.org", privacyNoticeVersion: "test-notice-v1", website: "", requestId: "11111111-2222-4333-8444-555555555555" };
const request = (body = data, headers = {}, method = "POST") => new Request(`${env.SITE_URL}/api/careers`, { method, headers: { origin: env.SITE_URL, "content-type": "application/json", ...headers }, body: method === "POST" ? typeof body === "string" ? body : JSON.stringify(body) : undefined });
const sent = () => Response.json({ id: "mock-provider-id" });

test("client-to-handler integration sends validated answers only to the configured inbox", async () => {
  let message;
  const handler = createCareersHandler({ env, fetchImpl: async (url, options) => { message = { url, ...options, payload: JSON.parse(options.body) }; return sent(); } });
  const bridge = async (url, options) => {
    assert.equal(url, "/api/careers");
    return handler(request(options.body), { ip: "127.0.0.1" });
  };
  await sendApplication({ ...data, to: "untrusted@example.org" }, bridge);
  assert.equal(message.url, "https://api.resend.com/emails");
  assert.deepEqual(message.payload.to, [env.MAIL_TO]);
  assert.equal(message.payload.from, env.MAIL_FROM);
  assert.equal(message.payload.reply_to, data.email);
  for (const answer of [data.name, data.pitch, data.collaboration, data.experience, data.availability, data.email]) assert.ok(message.payload.text.includes(answer));
  assert.ok(message.payload.subject.includes("Sviluppo web"));
});

test("missing configuration fails honestly without contacting an email provider", async () => {
  const handler = createCareersHandler({ env: {}, fetchImpl: () => assert.fail("Unexpected network call") });
  const response = await handler(request());
  assert.equal(response.status, 503);
  assert.equal((await response.json()).code, "EMAIL_NOT_CONFIGURED");
});

test("invalid input, payload types, honeypot and unsafe links never send email", async () => {
  const handler = createCareersHandler({ env, fetchImpl: () => assert.fail("Unexpected network call") });
  for (const [body, code] of [
    [{ ...data, email: "bad\naddress@example.org" }, 422],
    [{ ...data, role: "unknown" }, 422],
    [{ ...data, pitch: "short" }, 422],
    [{ ...data, portfolio: "javascript:alert(1)" }, 422],
    [{ ...data, name: {} }, 400],
    [{ ...data, website: "spam.example.com" }, 400],
    [{ ...data, requestId: "invalid" }, 400],
    [null, 400], [[], 400], ["{invalid", 400],
  ]) assert.equal((await handler(request(body))).status, code);
});

test("wrong origins, methods, content types and excessive bodies are rejected", async () => {
  const handler = createCareersHandler({ env, fetchImpl: () => assert.fail("Unexpected network call") });
  assert.equal((await handler(request(data, { origin: "https://another.example.com" }))).status, 403);
  assert.equal((await handler(request(data, {}, "GET"))).status, 405);
  assert.equal((await handler(request(data, { "content-type": "text/plain" }))).status, 415);
  assert.equal((await handler(request({ ...data, pitch: "x".repeat(13_000) }))).status, 413);
});

test("provider rejections and malformed success responses do not show a successful send", async () => {
  for (const provider of [
    () => Response.json({ message: "secret internal error" }, { status: 401 }),
    () => Response.json({ error: "rate limited" }, { status: 429 }),
    () => Response.json({}),
    () => new Response("Bad Gateway", { status: 502 }),
    () => { throw new Error("network timeout"); },
  ]) {
    const handler = createCareersHandler({ env, fetchImpl: provider });
    const response = await handler(request());
    assert.equal(response.status, 502);
    const body = await response.json();
    assert.equal(body.ok, undefined);
    assert.ok(!JSON.stringify(body).includes("secret internal error"));
    assert.ok(!JSON.stringify(body).includes(env.RESEND_API_KEY));
  }
});

test("retrying the same submission retains the provider idempotency key", async () => {
  const keys = [];
  let attempt = 0;
  const handler = createCareersHandler({ env, fetchImpl: async (_, options) => {
    keys.push(options.headers["Idempotency-Key"]);
    if (attempt++ === 0) throw new Error("temporary network issue");
    return sent();
  } });
  assert.equal((await handler(request())).status, 502);
  assert.equal((await handler(request())).status, 200);
  assert.equal(keys[0], keys[1]);
  assert.ok(keys[0].includes(data.requestId));
});

test("per-instance submission limit stops repeated email attempts", async () => {
  let calls = 0;
  const handler = createCareersHandler({ env, fetchImpl: async () => { calls++; return sent(); } });
  for (let i = 0; i < 5; i++) assert.equal((await handler(request())).status, 200);
  const blocked = await handler(request());
  assert.equal(blocked.status, 429);
  assert.ok(Number(blocked.headers.get("retry-after")) > 0);
  assert.equal(calls, 5);
});

test("the client rejects an unavailable API, missing confirmation and offline errors", async () => {
  for (const fakeFetch of [
    async () => new Response("<html>SPA fallback</html>"),
    async () => Response.json({ ok: false }),
    async () => Response.json({ error: "Servizio non configurato." }, { status: 503 }),
    async () => { throw new Error("offline"); },
  ]) await assert.rejects(sendApplication(data, fakeFetch));
});
