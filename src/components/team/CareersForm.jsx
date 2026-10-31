import FormPrivacyNotice from "../ui/FormPrivacyNotice";
import { hasPublishedPrivacy, legalPublication } from "../../data/legal";
import { whatsappHref } from "../../lib/contact-channels";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Send } from "lucide-react";
import { studio } from "../../data/studio";
import { availabilityOptions, careerRoles, collaborationOptions, experienceOptions, initialApplication, validateApplication } from "../../lib/careers";
import { newSubmissionId, sendApplication } from "../../lib/send-application";
import AuroraBackdrop from "../ui/AuroraBackdrop";
import "../../styles/FrostedForms.css";
import "./CareersForm.css";
import {useTranslation} from "../../i18n/context.js";


const stepNames = ["Area", "Profilo", "Invio"];
const prompts = {
  sviluppo: "Quali tecnologie usi? Raccontaci un tuo progetto.",
  design: "Che cosa ti piace progettare? Raccontaci un tuo lavoro.",
  social: "Quali contenuti crei? Raccontaci una tua idea o un progetto.",
  altro: "Qual è il tuo talento e come vorresti metterlo in gioco?",
};
const titles = ["Dove vuoi metterti in gioco?", "Parlaci del tuo lavoro.", "Facciamo conoscenza."];
const mobileTitles = ["La tua area.", "Il tuo percorso.", "I tuoi contatti."];
const getStep = (name) => ["role", "collaboration"].includes(name) ? 0 : ["experience", "availability", "portfolio", "pitch"].includes(name) ? 1 : 2;
const FieldError = ({ name, errors }) => { const {t:tr}=useTranslation(); return (errors[name] ? <p className="careers-error" id={`career-${name}-error`} role="alert">{tr(errors[name])}</p> : null); };

export default function CareersForm() {
  const {t:tr}=useTranslation();

  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialApplication);
  const [errors, setErrors] = useState({});
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState("idle");
  const [sendError, setSendError] = useState("");
  const formRef = useRef(null);
  const headingRef = useRef(null);
  const movedRef = useRef(false);
  const requestIdRef = useRef(null);
  const inFlightRef = useRef(false);
  const sending = status === "sending";
  const sent = status === "sent";
  const selectedRole = careerRoles.find((role) => role.value === data.role);

  useEffect(() => {
    if (!movedRef.current) return;
    headingRef.current?.focus({ preventScroll: true });
    formRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }, [step, sent]);

  function update(event) {
    if (inFlightRef.current) return;
    const { name, value } = event.target;
    setData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setSendError("");
    requestIdRef.current = null;
  }

  function showErrors(nextErrors) {
    setErrors(nextErrors);
    const first = Object.keys(nextErrors)[0];
    if (!first) return false;
    const nextStep = getStep(first);
    if (nextStep !== step) { movedRef.current = true; setStep(nextStep); }
    else formRef.current?.querySelector(`[name="${first}"]`)?.focus();
    return true;
  }

  async function submit(event) {
    event.preventDefault();
    if (inFlightRef.current || sent || !hasPublishedPrivacy()) return;
    if (showErrors(validateApplication(data, step === 2 ? undefined : step))) return;
    movedRef.current = true;
    if (step < 2) { setStep((current) => current + 1); return; }
    inFlightRef.current = true;
    setStatus("sending");
    setSendError("");
    try {
      requestIdRef.current ||= newSubmissionId();
      await sendApplication({ ...data, website, privacyNoticeVersion: legalPublication.privacyNoticeVersion, requestId: requestIdRef.current });
      setStatus("sent");
    } catch (error) {
      setStatus("error");
      setSendError(error.message);
      if (error.fields) showErrors(error.fields);
    } finally { inFlightRef.current = false; }
  }

  function back() {
    if (inFlightRef.current) return;
    movedRef.current = true;
    setErrors({});
    setSendError("");
    setStep((current) => Math.max(0, current - 1));
  }

  function selectField(name, label, options) {
    return <div className="careers-field frosted-field"><label htmlFor={`career-${name}`}>{tr(label)}</label>
      <select id={`career-${name}`} name={name} value={data[name]} onChange={update} required aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `career-${name}-error` : undefined}>
        <option value="" disabled>{tr("Seleziona")}</option>{options.map((option) => <option key={option} value={option}>{tr(option)}</option>)}
      </select><FieldError name={name} errors={errors} /></div>;
  }

  return (
    <section id="lavora-con-noi" className="careers-section frosted-scene" aria-labelledby="careers-title">
      <AuroraBackdrop />
      <div className="careers-layout">
        <header className="careers-intro frosted-intro">
          <h2 id="careers-title">{tr("Lavora")}<br className="careers-desktop-break" />{tr(" con noi.")}</h2>
          <p className="careers-desktop-copy">{tr("Scrivi codice, disegni identità o crei contenuti? Raccontaci cosa ti piace fare.")}</p>
          <p className="careers-mobile-copy">{tr("Raccontaci cosa sai fare.")}</p>
          <p className="careers-intro__small">{tr("Candidature spontanee e collaborazioni. Partiamo da poche domande, poi ci conosciamo.")}</p>
          <a href={studio.email ? `mailto:${studio.email}` : whatsappHref()} target={studio.email ? undefined : "_blank"} rel={studio.email ? undefined : "noopener noreferrer"}>{tr(studio.email ? "Scrivici via email " : "Scrivici su WhatsApp")}<ArrowUpRight size={15} aria-hidden="true" /></a>
        </header>

        <form className="careers-form frosted-panel" ref={formRef} onSubmit={submit} noValidate aria-labelledby="career-step-title" aria-busy={sending} data-step={step}>
          {!sent && <ol className="careers-progress frosted-progress" aria-label={tr("Avanzamento candidatura")}>{stepNames.map((label, index) => <li key={label} aria-current={index === step ? "step" : undefined} data-complete={index < step ? "" : undefined}><span className="frosted-progress__step">{tr(label)}</span></li>)}</ol>}
          <div className="careers-form__heading frosted-step-heading">{sent && <p>{tr("Grazie per esserti presentato")}</p>}<h3 id="career-step-title" tabIndex={-1} ref={headingRef}>{tr(sent ? "Email inviata." : <><span className="careers-desktop-copy">{tr(titles[step])}</span><span className="careers-mobile-copy">{tr(mobileTitles[step])}</span></>)}</h3></div>

          {sent ? <div className="careers-sent" role="status">
            <span className="careers-sent__check" aria-hidden="true"><Check size={26} /></span>
            <p>{tr("Grazie, ")}{data.name.trim()}{tr(". Il tuo messaggio è stato inviato al team. Ti contatteremo se ci sarà una collaborazione adatta al tuo profilo.")}</p>
            <Link to="/" className="careers-button careers-button--primary frosted-button">{tr("Torna alla home ")}<ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div> : <>
            <FormPrivacyNotice />
            <fieldset className="careers-controls" disabled={sending || !hasPublishedPrivacy()}>
              <div className="careers-honeypot" aria-hidden="true"><label htmlFor="career-website">{tr("Lascia vuoto questo campo")}</label><input id="career-website" name="website" value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" /></div>
              <div className="careers-fields" key={step}>
                {step === 0 && <>
                  <fieldset className="careers-fieldset" aria-describedby={errors.role ? "career-role-error" : undefined}>
                    <legend className="careers-legend">{tr("La tua area")}</legend>
                    <div className="careers-roles">{careerRoles.map((role) => <label key={role.value} className="careers-choice frosted-choice" data-checked={data.role === role.value ? "" : undefined}>
                      <input type="radio" name="role" value={role.value} checked={data.role === role.value} onChange={update} required aria-invalid={Boolean(errors.role)} />
                      <span className="careers-choice__text"><span>{tr(role.label)}</span><small>{tr(role.detail)}</small></span>
                      <span className="careers-choice__mark frosted-choice__mark" aria-hidden="true">{data.role === role.value && <Check size={12} strokeWidth={2.5} />}</span>
                    </label>)}</div><FieldError name="role" errors={errors} />
                  </fieldset>
                  {tr(selectField("collaboration", "Tipo di collaborazione", collaborationOptions))}
                </>}
                {step === 1 && <>
                  <div className="careers-fields__pair">{tr(selectField("experience", "Esperienza", experienceOptions))}{tr(selectField("availability", "Disponibilità", availabilityOptions))}</div>
                  <div className="careers-field frosted-field"><label htmlFor="career-portfolio">{tr("Portfolio o profilo ")}<span>{tr("facoltativo")}</span></label><input id="career-portfolio" name="portfolio" value={data.portfolio} onChange={update} inputMode="url" autoCapitalize="none" spellCheck={false} maxLength={300} placeholder={tr("https://")} aria-invalid={Boolean(errors.portfolio)} aria-describedby={errors.portfolio ? "career-portfolio-error" : "career-portfolio-help"} /><small id="career-portfolio-help">{tr("Portfolio, GitHub, LinkedIn o CV online.")}</small><FieldError name="portfolio" errors={errors} /></div>
                  <div className="careers-field frosted-field"><label htmlFor="career-pitch">{tr(prompts[data.role])}</label><textarea id="career-pitch" name="pitch" value={data.pitch} onChange={update} minLength={20} maxLength={500} required rows={3} placeholder={tr("Poche righe, anche su un progetto personale.")} aria-invalid={Boolean(errors.pitch)} aria-describedby={errors.pitch ? "career-pitch-error" : undefined} /><FieldError name="pitch" errors={errors} /></div>
                </>}
                {step === 2 && <>
                  <div className="careers-field frosted-field"><label htmlFor="career-name">{tr("Come ti chiami?")}</label><input id="career-name" name="name" value={data.name} onChange={update} autoComplete="name" maxLength={80} required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "career-name-error" : undefined} /><FieldError name="name" errors={errors} /></div>
                  <div className="careers-field frosted-field"><label htmlFor="career-email">{tr("La tua email")}</label><input id="career-email" name="email" type="email" value={data.email} onChange={update} autoComplete="email" autoCapitalize="none" maxLength={254} required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "career-email-error" : undefined} /><FieldError name="email" errors={errors} /></div>
                  <div className="careers-summary"><p>{tr("La tua candidatura")}</p><dl><div><dt>{tr("Area")}</dt><dd>{tr(selectedRole?.label)}</dd></div><div><dt>{tr("Collaborazione")}</dt><dd>{tr(data.collaboration)}</dd></div><div><dt>{tr("Disponibilità")}</dt><dd>{tr(data.availability)}</dd></div></dl></div>
                </>}
              </div>
              {sendError && <p className="careers-send-error" role="alert">{tr(sendError)}</p>}
              <div className="careers-navigation" data-first={step === 0 ? "" : undefined}>
                {step > 0 && <button type="button" className="careers-back frosted-back" onClick={back}><ArrowLeft size={15} aria-hidden="true" />{tr(" Indietro")}</button>}
                <button className="careers-button careers-button--primary frosted-button" type="submit">{tr(sending ? "Invio in corso…" : step === 2 ? "Invia email" : "Continua")}{sending ? <span className="careers-spinner" aria-hidden="true" /> : step === 2 ? <Send size={16} aria-hidden="true" /> : <ArrowRight size={17} aria-hidden="true" />}</button>
              </div>
            </fieldset>
            <span className="careers-sr-only" role="status">{tr(sending ? "Invio della candidatura in corso." : "")}</span>
          </>}
        </form>
      </div>
    </section>
  );
}
