import { createHash } from "node:crypto";
import { buildApplication, initialApplication, validateApplication } from "../src/lib/careers.js";

const MAX_BODY = 12_000;
const WINDOW = 10 * 60 * 1000;
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const idPattern = /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i;
const json = (status, body, headers = {}) => Response.json(body, {
  status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", ...headers },
});

async function readBody(request) {
  if (Number(request.headers.get("content-length")) > MAX_BODY) throw new RangeError();
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError();
  const chunks = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY) { await reader.cancel(); throw new RangeError(); }
    chunks.push(value);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

// The limits are per running instance. Edge/platform limits can be added at deployment.
export function createCareersHandler({ env = process.env, fetchImpl = fetch, now = Date.now } = {}) {
  const attempts = new Map();
  function limit(keys) {
    const time = now();
    for (const [key, item] of attempts) if (item.until <= time) attempts.delete(key);
    for (const [key, max] of keys) {
      const item = attempts.get(key);
      if (item && item.count >= max) return Math.ceil((item.until - time) / 1000);
    }
    if (attempts.size > 2000) return 60;
    for (const [key] of keys) {
      const item = attempts.get(key) || { count: 0, until: time + WINDOW };
      item.count += 1;
      attempts.set(key, item);
    }
    return 0;
  }

  return async function handleCareers(request, { ip = "local" } = {}) {
    if (request.method !== "POST") return json(405, { error: "Metodo non consentito." }, { Allow: "POST" });
    let allowedOrigin;
    try { allowedOrigin = new URL(env.SITE_URL || request.url).origin; }
    catch { return json(503, { code: "EMAIL_NOT_CONFIGURED", error: "Invio temporaneamente non disponibile." }); }
    if (request.headers.get("origin") !== allowedOrigin) return json(403, { error: "Richiesta non consentita." });
    if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return json(415, { error: "Formato non valido." });

    let input;
    try { input = await readBody(request); }
    catch (error) { return json(error instanceof RangeError ? 413 : 400, { error: "Richiesta non valida o troppo lunga." }); }
    if (!input || typeof input !== "object" || Array.isArray(input)) return json(400, { error: "Richiesta non valida." });
    if (typeof input.website !== "string" || input.website !== "") return json(400, { error: "Richiesta non valida." });
    if (typeof input.requestId !== "string" || !idPattern.test(input.requestId)) return json(400, { error: "Identificativo della richiesta non valido." });
    const data = {};
    for (const key of Object.keys(initialApplication)) {
      if (typeof input[key] !== "string") return json(400, { error: "Compila tutti i campi richiesti." });
      data[key] = input[key].trim();
    }
    const errors = validateApplication(data);
    if (Object.keys(errors).length) return json(422, { error: "Controlla i campi indicati.", errors });

    const recipient = env.MAIL_TO?.trim();
    const sender = env.MAIL_FROM?.trim();
    const senderEmail = sender?.match(/<([^<>]+)>$/)?.[1] || sender;
    if (!env.RESEND_API_KEY || !emailPattern.test(recipient || "") || !emailPattern.test(senderEmail || "") || /[\r\n]/.test(sender || "")) {
      return json(503, { code: "EMAIL_NOT_CONFIGURED", error: "L’invio dal sito non è ancora disponibile. Riprova più tardi." });
    }
    const hash = (value) => createHash("sha256").update(value).digest("hex");
    const retryAfter = limit([[`ip:${hash(ip)}`, 8], [`email:${hash(data.email.toLowerCase())}`, 5]]);
    if (retryAfter) return json(429, { error: "Troppi tentativi. Attendi qualche minuto prima di riprovare." }, { "Retry-After": String(retryAfter) });

    const { subject, body } = buildApplication(data);
    try {
      const response = await fetchImpl("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `brodaxy-careers/${input.requestId}` },
        body: JSON.stringify({ from: sender, to: [recipient], reply_to: data.email, subject, text: body }),
        signal: AbortSignal.timeout(10_000),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || typeof result?.id !== "string" || !result.id) {
        return json(502, { error: "Non siamo riusciti a confermare l’invio. Riprova tra poco: le risposte sono ancora qui." });
      }
      return json(200, { ok: true });
    } catch {
      return json(502, { error: "Non siamo riusciti a confermare l’invio. Controlla la connessione e riprova." });
    }
  };
}
