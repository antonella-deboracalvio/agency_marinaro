import { createHmac, randomBytes } from "node:crypto";

export class BodyTimeoutError extends Error {}

// Bound both bytes and elapsed time, including a chunked request without Content-Length.
export async function readFormJson(request, maxBytes, timeoutMs = 5000) {
  const length = request.headers.get("content-length");
  if (length !== null && (!/^\d+$/.test(length) || Number(length) > maxBytes)) throw new RangeError();
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError();
  let timer;
  const deadline = new Promise((_, reject) => { timer = setTimeout(() => reject(new BodyTimeoutError()), timeoutMs); });
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await Promise.race([reader.read(), deadline]);
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) throw new RangeError();
      chunks.push(value);
    }
    return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(Buffer.concat(chunks)));
  } catch (error) {
    void reader.cancel().catch(() => {});
    throw error;
  } finally {
    clearTimeout(timer);
    reader.releaseLock();
  }
}

export function siteOrigin(value) {
  try {
    const url = new URL(value);
    const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
    if ((url.protocol !== "https:" && !(local && url.protocol === "http:")) || url.username || url.password || url.search || url.hash || url.pathname !== "/") return null;
    return url.origin;
  } catch { return null; }
}

// One limiter per handler/instance, with a random HMAC key. This does not replace an edge limit.
export function createFormLimiter(now = Date.now) {
  const entries = new Map();
  const key = randomBytes(32);
  const windowMs = 10 * 60 * 1000;
  return (scope, value, maximum) => {
    const time = now();
    for (const [id, entry] of entries) if (entry.until <= time) entries.delete(id);
    const id = `${scope}:${createHmac("sha256", key).update(String(value)).digest("hex")}`;
    const entry = entries.get(id);
    if (entry && entry.count >= maximum) return Math.max(1, Math.ceil((entry.until - time) / 1000));
    if (!entry && entries.size >= 4096) return 60;
    entries.set(id, { count: (entry?.count || 0) + 1, until: entry?.until || time + windowMs });
    return 0;
  };
}

export function privacyVersion(value) {
  return typeof value === "string" && /^[a-z\d._-]{1,80}$/i.test(value) ? value : null;
}
