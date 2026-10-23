import { BRAND_NAME } from "./brand.js";

export const careerRoles = [
  { value: "sviluppo", label: "Sviluppo web", detail: "Siti, e-commerce e gestionali" },
  { value: "design", label: "Design & brand", detail: "Interfacce, identità e grafica" },
  { value: "social", label: "Social media", detail: "Strategia, contenuti e campagne" },
  { value: "altro", label: "Un altro talento", detail: "Raccontaci cosa sai fare" },
];
export const experienceOptions = ["Sto iniziando", "1–3 anni", "Oltre 3 anni"];
export const collaborationOptions = ["Freelance / a progetto", "Collaborazione continuativa", "Valutiamo insieme"];
export const availabilityOptions = ["Da subito", "Entro un mese", "Da concordare"];
export const initialApplication = { role: "", collaboration: "", experience: "", availability: "", portfolio: "", pitch: "", name: "", email: "" };

export function normalizePortfolio(value) {
  const text = value.trim();
  if (!text) return "";
  try {
    const url = new URL(/^[a-z][a-z\d+.-]*:/i.test(text) ? text : `https://${text}`);
    if (!["https:", "http:"].includes(url.protocol) || !url.hostname.includes(".") || url.username || url.password) return null;
    return url.href;
  } catch { return null; }
}

export function validateApplication(data, step) {
  const errors = {};
  if (step === undefined || step === 0) {
    if (!careerRoles.some((role) => role.value === data.role)) errors.role = "Scegli l’area in cui vuoi collaborare.";
    if (!collaborationOptions.includes(data.collaboration)) errors.collaboration = "Scegli il tipo di collaborazione.";
  }
  if (step === undefined || step === 1) {
    if (!experienceOptions.includes(data.experience)) errors.experience = "Indica la tua esperienza.";
    if (!availabilityOptions.includes(data.availability)) errors.availability = "Indica quando saresti disponibile.";
    if (data.portfolio.length > 300 || normalizePortfolio(data.portfolio) === null) errors.portfolio = "Inserisci un link valido al portfolio o al profilo, oppure lascia vuoto.";
    if (data.pitch.trim().length < 20) errors.pitch = "Scrivi almeno 20 caratteri sul tuo lavoro o su cosa vuoi imparare.";
    if (data.pitch.length > 500) errors.pitch = "Resta entro 500 caratteri.";
  }
  if (step === undefined || step === 2) {
    if (data.name.trim().length < 2 || data.name.trim().length > 80) errors.name = "Inserisci il tuo nome (da 2 a 80 caratteri).";
    if (data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = "Inserisci un indirizzo email valido.";
  }
  return errors;
}

export function buildApplication(data) {
  const role = careerRoles.find((item) => item.value === data.role)?.label || "Candidatura spontanea";
  const subject = `Candidatura ${BRAND_NAME} — ${role}`;
  const body = [
    `Ciao ${BRAND_NAME},`, "", "mi piacerebbe collaborare con voi.", "",
    `Nome: ${data.name.trim()}`, `Email: ${data.email.trim()}`, `Area: ${role}`,
    `Collaborazione: ${data.collaboration}`, `Esperienza: ${data.experience}`, `Disponibilità: ${data.availability}`,
    `Portfolio / profilo: ${normalizePortfolio(data.portfolio) || "Non indicato"}`,
    "", "Qualcosa su di me:", data.pitch.trim(), "", "A presto,", data.name.trim(),
  ].join("\n");
  return { subject, body };
}
