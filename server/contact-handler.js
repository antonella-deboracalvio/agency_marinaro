import { BodyTimeoutError, createFormLimiter, privacyVersion, readFormJson, siteOrigin } from "./form-security.js";
import { buildInquiry, initialInquiry, validateInquiry } from "../src/lib/contact.js";

const MAX_BODY = 16_000;
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const idPattern = /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i;
const json = (status, body, headers = {}) => Response.json(body, {
  status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", ...headers },
});

// Same server-only mail configuration as careers; no external package required.
export function createContactHandler({ env = process.env, fetchImpl = fetch, now = Date.now } = {}) {
  const limit = createFormLimiter(now);

  return async function handleContact(request, { ip = "local" } = {}) {
    if (request.method !== "POST") return json(405, { error: "Metodo non consentito." }, { Allow: "POST" });
    const allowedOrigin = siteOrigin(env.SITE_URL);
    if (!allowedOrigin) return json(503, { code: "EMAIL_NOT_CONFIGURED", error: "Invio temporaneamente non disponibile." });
    if (request.headers.get("origin") !== allowedOrigin || request.headers.get("sec-fetch-site") === "cross-site") return json(403, { error: "Richiesta non consentita." });
    if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json" || ![null, "identity"].includes(request.headers.get("content-encoding"))) return json(415, { error: "Formato non valido." });
    const ipRetry = limit("ip", ip, 20);
    if (ipRetry) return json(429, { error: "Troppi tentativi. Attendi qualche minuto e riprova." }, { "Retry-After": String(ipRetry) });
    const noticeVersion = privacyVersion(env.PRIVACY_NOTICE_VERSION);
    if (!noticeVersion) return json(503, { error: "Il modulo non è ancora attivo. Puoi contattarci direttamente." });
    let input;
    try { input = await readFormJson(request, MAX_BODY); }
    catch (error) { return json(error instanceof BodyTimeoutError ? 408 : error instanceof RangeError ? 413 : 400, { error: "Richiesta non valida o troppo lunga." }); }
    if (!input || typeof input !== "object" || Array.isArray(input)) return json(400, { error: "Richiesta non valida." });
    if (input.website !== "" || typeof input.requestId !== "string" || !idPattern.test(input.requestId)) return json(400, { error: "Richiesta non valida." });
    if (input.privacyNoticeVersion !== noticeVersion) return json(409, { error: "L’informativa è stata aggiornata. Ricarica la pagina prima di inviare." });
    const data = {};
    for (const key of Object.keys(initialInquiry)) {
      if (key === "services") { data.services = input.services; continue; }
      if (typeof input[key] !== "string") return json(400, { error: "Compila i campi richiesti." });
      data[key] = input[key].trim();
    }
    const errors = validateInquiry(data);
    if (Object.keys(errors).length) return json(422, { error: "Controlla i campi indicati.", errors });

    const recipient = env.MAIL_TO?.trim();
    const sender = env.MAIL_FROM?.trim();
    const senderEmail = sender?.match(/<([^<>]+)>$/)?.[1] || sender;
    if (!env.RESEND_API_KEY || !emailPattern.test(recipient || "") || !emailPattern.test(senderEmail || "") || /[\r\n]/.test(sender || "")) {
      return json(503, { code: "EMAIL_NOT_CONFIGURED", error: "L’invio dal sito non è ancora disponibile. Puoi contattarci direttamente qui sotto." });
    }
    const retryAfter = limit("email", data.email.toLowerCase(), 5);
    if (retryAfter) return json(429, { error: "Troppi tentativi. Attendi qualche minuto e riprova." }, { "Retry-After": String(retryAfter) });
    const { subject, body } = buildInquiry(data);
    try {
      const response = await fetchImpl("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `marinaro-contact/${input.requestId}` },
        body: JSON.stringify({ from: sender, to: [recipient], reply_to: data.email, subject, text: body }),
        signal: AbortSignal.timeout(10_000),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || typeof result?.id !== "string" || !result.id) return json(502, { error: "Invio non confermato. Riprova tra poco: le risposte sono ancora qui." });
      return json(200, { ok: true });
    } catch {
      return json(502, { error: "Invio non confermato. Controlla la connessione e riprova." });
    }
  };
}
