export function newSubmissionId() {
  if (globalThis.crypto.randomUUID) return globalThis.crypto.randomUUID();
  const bytes = globalThis.crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 15) | 64;
  bytes[8] = (bytes[8] & 63) | 128;
  const hex = [...bytes].map((n) => n.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export async function sendApplication(payload, fetchImpl = fetch) {
  let response;
  try {
    response = await fetchImpl("/api/careers", {
      method: "POST", credentials: "omit", cache: "no-store", referrerPolicy: "no-referrer", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload), signal: AbortSignal.timeout(20_000),
    });
  } catch {
    throw new Error("Invio non confermato. Controlla la connessione e riprova: le risposte sono ancora qui.");
  }
  const result = await response.json().catch(() => null);
  if (!response.ok || result?.ok !== true) {
    const error = new Error(result?.error || "Invio non disponibile. Riprova tra poco: le risposte sono ancora qui.");
    if (response.status === 422) error.fields = result?.errors;
    throw error;
  }
}
