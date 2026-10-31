import { BRAND_NAME } from "./brand.js";
import { serviceCatalog } from "../data/service-catalog.js";

export const contactServices = [
  ...serviceCatalog.flatMap(area => area.options),
  { value: "other", label: "Altro, parliamone" },
];
export const contactTimings = ["Il prima possibile", "Entro 1–3 mesi", "Più avanti", "Da definire insieme"];
export const initialInquiry = { services: [], timing: "", message: "", name: "", email: "", company: "", phone: "" };

export function validateInquiry(data, step) {
  const errors = {};
  if (step === undefined || step === 0) {
    if (!Array.isArray(data.services) || data.services.length < 1 || data.services.length > contactServices.length ||
      new Set(data.services).size !== data.services.length || !data.services.every((value) => contactServices.some((service) => service.value === value))) {
      errors.services = "Seleziona almeno un servizio.";
    }
  }
  if (step === undefined || step === 1) {
    if (!contactTimings.includes(data.timing)) errors.timing = "Indica una tempistica, anche da definire insieme.";
    if (typeof data.message !== "string" || data.message.trim().length < 10 || data.message.length > 3000) errors.message = "Raccontaci l’idea in almeno 10 caratteri, fino a 3.000.";
  }
  if (step === undefined || step === 2) {
    if (typeof data.name !== "string" || data.name.trim().length < 2 || data.name.trim().length > 100 || /[\r\n]/.test(data.name)) errors.name = "Inserisci il tuo nome (da 2 a 100 caratteri).";
    if (typeof data.email !== "string" || data.email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email.trim())) errors.email = "Inserisci un indirizzo email valido.";
    if (typeof data.company !== "string" || data.company.length > 160 || /[\r\n]/.test(data.company)) errors.company = "Resta entro 160 caratteri.";
    if (typeof data.phone !== "string" || data.phone.length > 50 || (data.phone.trim() && !/^[+\d\s().-]{5,50}$/.test(data.phone))) errors.phone = "Inserisci un numero valido oppure lascia vuoto.";
  }
  return errors;
}

export function buildInquiry(data) {
  const services = contactServices.filter((service) => data.services.includes(service.value)).map((service) => service.label);
  return {
    subject: `${BRAND_NAME} — Nuova richiesta di progetto`,
    body: [
      `Nuova richiesta per ${BRAND_NAME}`, "",
      `Nome: ${data.name.trim()}`, `Email: ${data.email.trim()}`,
      `Azienda: ${data.company.trim() || "Non indicata"}`, `Telefono: ${data.phone.trim() || "Non indicato"}`,
      "", "Servizi richiesti:", ...services.map((label) => `• ${label}`),
      "", `Tempistiche: ${data.timing}`, "", "Il progetto:", data.message.trim(),
    ].join("\n"),
  };
}

export async function sendInquiry(payload, fetchImpl = fetch) {
  let response;
  try {
    response = await fetchImpl("/api/contact", {
      method: "POST", credentials: "omit", cache: "no-store", referrerPolicy: "no-referrer", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload), signal: AbortSignal.timeout(20_000),
    });
  } catch {
    throw new Error("Invio non confermato. Controlla la connessione e riprova: le risposte sono ancora qui.");
  }
  const result = await response.json().catch(() => null);
  if (!response.ok || result?.ok !== true) {
    const error = new Error(result?.error || "Non siamo riusciti a confermare l’invio. Riprova tra poco.");
    if (response.status === 422) error.fields = result?.errors;
    throw error;
  }
}
