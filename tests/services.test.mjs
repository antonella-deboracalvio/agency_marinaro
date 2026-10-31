import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { serviceCatalog, inquiryHref } from "../src/data/service-catalog.js";
import { servicePages } from "../src/data/service-pages.js";
import { contactServices, initialInquiry, validateInquiry } from "../src/lib/contact.js";
import { createContactHandler } from "../server/contact-handler.js";

test("i dodici collegamenti della home arrivano a una sezione della pagina corretta", () => {
  assert.deepEqual(serviceCatalog.map(area => area.id), ["digital", "identity", "content", "campaigns"]);
  const paths = new Set();
  const hosting = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8"));
  for (const area of serviceCatalog) {
    assert.equal(paths.has(area.href), false, `Duplicate route: ${area.href}`);
    paths.add(area.href);
    assert.ok(hosting.rewrites.some(rule => rule.source === area.href && rule.destination === "/index.html"), `Direct access: ${area.href}`);
    const page = servicePages[area.id];
    assert.ok(page?.title && page?.description);
    assert.equal(area.links.length, 3);
    const ids = page.sections.map(section => section.id);
    assert.equal(new Set(ids).size, ids.length);
    for (const link of area.links) assert.ok(ids.includes(link.anchor), `${area.href}#${link.anchor}`);
    assert.equal(page.gallery, undefined);
  }
});

test("ogni invito delle nuove pagine preseleziona un servizio riconosciuto dal modulo", () => {
  for (const page of Object.values(servicePages)) {
    for (const section of page.sections) {
      const url = new URL(inquiryHref(section.service), "https://studio.example");
      assert.equal(url.pathname, "/contatti");
      const selected = url.searchParams.getAll("servizio");
      assert.deepEqual(validateInquiry({ ...initialInquiry, services: selected }, 0), {}, section.id);
    }
  }
  const values = contactServices.map(service => service.value);
  assert.equal(new Set(values).size, values.length);
  // Existing project and pricing links continue to work after regrouping.
  for (const value of ["web", "ecommerce", "identity", "booking", "management", "qr", "social", "other"]) assert.ok(values.includes(value));
});

test("i nuovi servizi attraversano l’endpoint e arrivano nel riepilogo email senza perdere le scelte", async () => {
  const calls = [];
  const handler = createContactHandler({
    env: { PRIVACY_NOTICE_VERSION: "test-notice-v1", RESEND_API_KEY: "test-only", MAIL_FROM: "Studio <studio@example.com>", MAIL_TO: "team@example.com", SITE_URL: "https://studio.example" },
    fetchImpl: async (url, init) => { calls.push(JSON.parse(init.body)); return Response.json({ id: "test-only-accepted" }); },
  });
  const response = await handler(new Request("https://studio.example/api/contact", {
    method: "POST", headers: { origin: "https://studio.example", "Content-Type": "application/json" },
    body: JSON.stringify({ ...initialInquiry, services: ["packaging", "materials", "shoot", "social", "talent", "events", "promotional", "invitations"], timing: "Da definire insieme", message: "Vorrei realizzare i materiali per la mia nuova attività.", name: "Cliente Test", email: "cliente@example.com", privacyNoticeVersion: "test-notice-v1", website: "", requestId: "b672783a-6573-4867-99b2-3671409ad172" }),
  }));
  assert.equal(response.status, 200);
  assert.equal(calls.length, 1);
  for (const label of ["Packaging", "Brand materials", "Content shoot", "Social content", "Talent content", "Event visuals", "Promotional design", "Digital invitations"]) assert.ok(calls[0].text.includes(label), label);
  assert.deepEqual(calls[0].to, ["team@example.com"]);
});
