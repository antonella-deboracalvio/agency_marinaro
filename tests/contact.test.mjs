import test from "node:test";
import assert from "node:assert/strict";
import { contactServices, contactTimings, initialInquiry, validateInquiry, buildInquiry, sendInquiry } from "../src/lib/contact.js";
import { createContactHandler } from "../server/contact-handler.js";

const valid = {
  ...initialInquiry,
  services: ["web", "identity", "social"], timing: contactTimings[1],
  message: "Vorrei un sito e un’identità per la mia attività.",
  name: "Cliente Test", email: "cliente@example.com", company: "", phone: "",
  privacyNoticeVersion: "test-notice-v1", website: "", requestId: "b672783a-6573-4867-99b2-3671409ad172",
};
const env = { PRIVACY_NOTICE_VERSION: "test-notice-v1", RESEND_API_KEY: "test-only", MAIL_FROM: "Studio <studio@example.com>", MAIL_TO: "team@example.com", SITE_URL: "https://studio.example" };
const request = (data = valid, options = {}) => new Request("https://studio.example/api/contact", {
  method: "POST", headers: { origin: "https://studio.example", "Content-Type": "application/json", ...options.headers },
  body: JSON.stringify(data), ...options,
});

test("tutti i servizi sono selezionabili; campi facoltativi vuoti ammessi", () => {
  assert.deepEqual(validateInquiry({ ...valid, services: contactServices.map((service) => service.value) }), {});
  assert.deepEqual(validateInquiry(valid), {});
  assert.ok(validateInquiry({ ...valid, services: [] }).services);
  assert.ok(validateInquiry({ ...valid, services: ["inesistente"] }).services);
  assert.ok(validateInquiry({ ...valid, services: ["web", "web"] }).services);
});

test("ogni step valida i propri campi e il riepilogo conserva i servizi", () => {
  assert.deepEqual(validateInquiry({ ...initialInquiry, services: ["qr"] }, 0), {});
  assert.ok(validateInquiry({ ...valid, timing: "", message: "" }, 1).message);
  assert.ok(validateInquiry({ ...valid, email: "non-valida" }, 2).email);
  assert.ok(validateInquiry({ ...valid, email: "test@example.com\nBcc: other@example.com" }, 2).email);
  const mail = buildInquiry(valid);
  for (const label of ["Siti web su misura", "Logo & visual identity", "Social content", valid.message]) assert.ok(mail.body.includes(label));
});

test("l’API spedisce solo al destinatario configurato e mantiene l’idempotenza", async () => {
  const calls = [];
  const handler = createContactHandler({ env, fetchImpl: async (url, init) => { calls.push({ url, init }); return Response.json({ id: "test-accepted" }); } });
  const payload = { ...valid, to: "attacker@example.com", subject: "ignored" };
  assert.equal((await handler(request(payload))).status, 200);
  assert.equal((await handler(request(payload))).status, 200);
  const body = JSON.parse(calls[0].init.body);
  assert.deepEqual(body.to, [env.MAIL_TO]);
  assert.equal(body.reply_to, valid.email);
  assert.equal(body.subject, buildInquiry(valid).subject);
  assert.equal(calls[0].init.headers["Idempotency-Key"], calls[1].init.headers["Idempotency-Key"]);
});

test("configurazione assente e rifiuto provider non producono conferme finte", async () => {
  let called = false;
  const missing = createContactHandler({ env: {}, fetchImpl: async () => { called = true; throw Error("unexpected"); } });
  assert.equal((await missing(request())).status, 503);
  assert.equal(called, false);
  for (const response of [Response.json({}, { status: 200 }), Response.json({ error: "rejected" }, { status: 500 })]) {
    const handler = createContactHandler({ env, fetchImpl: async () => response });
    const result = await handler(request());
    assert.equal(result.status, 502);
    assert.notEqual((await result.json()).ok, true);
  }
});

test("origine, formato, validazione e limite dimensione vengono controllati", async () => {
  const handler = createContactHandler({ env, fetchImpl: async () => { throw Error("must not send"); } });
  assert.equal((await handler(new Request("https://studio.example/api/contact"))).status, 405);
  assert.equal((await handler(request(valid, { headers: { origin: "https://other.example", "Content-Type": "application/json" } }))).status, 403);
  assert.equal((await handler(request(valid, { headers: { origin: "https://studio.example", "Content-Type": "text/plain" } }))).status, 415);
  assert.equal((await handler(request({ ...valid, services: [] }))).status, 422);
  assert.equal((await handler(request({ ...valid, services: null }))).status, 422);
  assert.equal((await handler(request({ ...valid, website: "spam" }))).status, 400);
  assert.equal((await handler(request({ ...valid, requestId: "invalid" }))).status, 400);
  assert.equal((await handler(request({ ...valid, message: "x".repeat(17_000) }))).status, 413);
});

test("limite tentativi ed errori di rete non duplicano un invio confermato", async () => {
  const handler = createContactHandler({ env, fetchImpl: async () => Response.json({ id: "accepted" }) });
  for (let i = 0; i < 5; i++) assert.equal((await handler(request())).status, 200);
  const limited = await handler(request());
  assert.equal(limited.status, 429);
  assert.ok(Number(limited.headers.get("retry-after")) > 0);
  const offline = createContactHandler({ env, fetchImpl: async () => { throw Error("offline"); } });
  assert.equal((await offline(request())).status, 502);
});

test("il client non scambia una risposta HTML o un errore per un successo", async () => {
  await assert.rejects(() => sendInquiry(valid, async () => new Response("<html>fallback</html>", { status: 200 })));
  await assert.rejects(() => sendInquiry(valid, async () => Response.json({ error: "Non disponibile" }, { status: 503 })), /Non disponibile/);
  await assert.rejects(() => sendInquiry(valid, async () => { throw Error("offline"); }), /risposte sono ancora qui/);
  await sendInquiry(valid, async (url, init) => { assert.equal(url, "/api/contact"); assert.deepEqual(JSON.parse(init.body), valid); return Response.json({ ok: true }); });
});
