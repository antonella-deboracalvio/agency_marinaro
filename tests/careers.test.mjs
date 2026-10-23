import test from "node:test";
import assert from "node:assert/strict";
import { buildApplication, careerRoles, initialApplication, normalizePortfolio, validateApplication } from "../src/lib/careers.js";

const application = {
  role: "sviluppo", collaboration: "Freelance / a progetto", experience: "1–3 anni",
  availability: "Entro un mese", portfolio: "github.com/example?tab=repositories",
  pitch: "Creo siti accessibili con React. Mi piace curare design & sviluppo, dall’idea al rilascio.",
  name: "Deb & Marco", email: "candidate+studio@example.com",
};

test("each area can complete the questionnaire without a mandatory portfolio", () => {
  for (const role of careerRoles) {
    const data = { ...application, role: role.value, portfolio: "" };
    for (const step of [0, 1, 2, undefined]) assert.deepEqual(validateApplication(data, step), {});
  }
});

test("empty and invalid answers block progression at the relevant step", () => {
  assert.deepEqual(Object.keys(validateApplication(initialApplication, 0)).sort(), ["collaboration", "role"]);
  assert.ok(validateApplication({ ...application, role: "invented" }, 0).role);
  assert.ok(validateApplication({ ...application, pitch: "    " }, 1).pitch);
  assert.ok(validateApplication({ ...application, pitch: "x".repeat(501) }, 1).pitch);
  assert.ok(validateApplication({ ...application, email: "invalid@" }, 2).email);
  assert.ok(validateApplication({ ...application, name: " " }, 2).name);
});

test("portfolio accepts ordinary web links and rejects script, file and credential URLs", () => {
  assert.equal(normalizePortfolio(" example.com/portfolio "), "https://example.com/portfolio");
  assert.equal(normalizePortfolio(""), "");
  for (const value of ["javascript:alert(1)", "data:text/html,example", "file:///tmp/cv.pdf", "https://user:password@example.com", "not a url"]) {
    assert.ok(validateApplication({ ...application, portfolio: value }, 1).portfolio, value);
  }
});

test("email content preserves every answer, Unicode and query characters", () => {
  const data = { ...application, pitch: `${application.pitch}\nUn progetto: 50% codice + 50% creatività?` };
  const result = buildApplication(data);
  assert.ok(result.subject.includes("Sviluppo web"));
  for (const value of [data.name, data.email, data.pitch, data.availability, data.collaboration, data.experience, "Sviluppo web", "https://github.com/example?tab=repositories"]) assert.ok(result.body.includes(value), value);
});
