import FormPrivacyNotice from "../components/ui/FormPrivacyNotice";
import { hasPublishedPrivacy, legalPublication } from "../data/legal";
import { whatsappHref } from "../lib/contact-channels";
import { useTranslation } from "../i18n/context";
import { languages, translateText } from "../i18n/core";
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { studio } from "../data/studio";
import { BRAND_NAME } from "../lib/brand";
import { serviceCatalog } from "../data/service-catalog";
import { contactServices, contactTimings, initialInquiry, sendInquiry, validateInquiry } from "../lib/contact";
import { newSubmissionId } from "../lib/send-application";
import AuroraBackdrop from "../components/ui/AuroraBackdrop";
import "../styles/FrostedForms.css";
import "./ContactPage.css";

const steps = ["Servizi", "Progetto", "Contatti"];
const titles = ["Da cosa partiamo?", "Raccontaci la tua idea.", "Come ti ricontattiamo?"];
const hints = ["Puoi scegliere più di un servizio.", "Bastano poche righe. Ai dettagli pensiamo insieme.", "Lasciaci un nome e un’email. Al resto pensiamo insieme."];
const fieldStep = (name) => name === "services" ? 0 : ["timing", "message"].includes(name) ? 1 : 2;
const FieldError = ({ name, errors }) => { const {t:tr}=useTranslation(); return (errors[name] ? <p className="contact-flow__error" id={`contact-${name}-error`} role="alert">{tr(errors[name])}</p> : null); };

export default function ContactPage() {
  const {t:tr}=useTranslation();

  const {language,t}=useTranslation();
  const [params] = useSearchParams();
  const [step, setStep] = useState(0);
  const [data, setData] = useState(() => ({
    ...initialInquiry,
    message: t(({inizia:'Vorrei avviare un nuovo progetto per la mia attività.',rinnova:'Vorrei rinnovare il mio sito o l’immagine della mia attività.',evolvi:'Vorrei aggiungere una funzione o uno strumento alla mia attività.',online:'Vorrei presentare la mia attività online.',brand:'Vorrei costruire un’immagine riconoscibile per la mia attività.',content:'Mi servono foto e contenuti coordinati per il mio brand.',tools:'Vorrei semplificare il lavoro con uno strumento su misura.'})[params.get('esigenza')] || initialInquiry.message),
    services: [...new Set(params.getAll("servizio"))].filter((value) => contactServices.some((service) => service.value === value)),
  }));
  const preset=({inizia:'Vorrei avviare un nuovo progetto per la mia attività.',rinnova:'Vorrei rinnovare il mio sito o l’immagine della mia attività.',evolvi:'Vorrei aggiungere una funzione o uno strumento alla mia attività.',online:'Vorrei presentare la mia attività online.',brand:'Vorrei costruire un’immagine riconoscibile per la mia attività.',content:'Mi servono foto e contenuti coordinati per il mio brand.',tools:'Vorrei semplificare il lavoro con uno strumento su misura.'})[params.get('esigenza')];
  useEffect(()=>{
    // Only our own untouched preset follows the language. Never rewrite user input.
    if(!preset)return;
    setData(current=>languages.some(item=>translateText(preset,item.code)===current.message)&&current.message!==t(preset)?{...current,message:t(preset)}:current);
  },[language,preset,t]);
  const [openArea, setOpenArea] = useState(() => {
    const requested = serviceCatalog.find(area => area.id === params.get("area"));
    return requested?.id || serviceCatalog.find(area => area.options.some(option => params.getAll("servizio").includes(option.value)))?.id || "digital";
  });
  const [errors, setErrors] = useState({});
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState("idle");
  const [sendError, setSendError] = useState("");
  const formRef = useRef(null);
  const headingRef = useRef(null);
  const movedRef = useRef(false);
  const inFlightRef = useRef(false);
  const requestIdRef = useRef(null);
  const sending = status === "sending";
  const sent = status === "sent";

  useEffect(() => {
    const previous = document.title;
    document.title = `Parliamone — ${BRAND_NAME}`;
    return () => { document.title = previous; };
  }, []);

  useEffect(() => {
    if (!movedRef.current) return;
    headingRef.current?.focus({ preventScroll: true });
    const form = formRef.current;
    if (!form) return;
    const rect = form.getBoundingClientRect();
    const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--site-header-height")) || 84;
    // Do not jump the page when the complete form is already in the viewport.
    if (rect.top < headerHeight + 8 || rect.bottom > window.innerHeight - 8) {
      form.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }
  }, [step, sent]);

  function update(event) {
    if (inFlightRef.current) return;
    const { name, value, checked } = event.target;
    setData((current) => ({ ...current, [name]: name === "services"
      ? checked ? [...new Set([...current.services, value])] : current.services.filter((service) => service !== value)
      : value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setSendError("");
    requestIdRef.current = null;
  }

  function moveTo(next) {
    if (inFlightRef.current) return;
    movedRef.current = true;
    setErrors({});
    setSendError("");
    setStep(next);
  }

  function showErrors(nextErrors) {
    const first = Object.keys(nextErrors)[0];
    if (!first) return false;
    setErrors(nextErrors);
    const nextStep = fieldStep(first);
    if (nextStep !== step) { movedRef.current = true; setStep(nextStep); }
    else if (first === "services") {
      const areaId = openArea || "digital";
      setOpenArea(areaId);
      requestAnimationFrame(() => formRef.current?.querySelector(`#contact-area-${areaId} input`)?.focus());
    } else formRef.current?.querySelector(`[name="${first}"]`)?.focus();
    return true;
  }

  async function submit(event) {
    event.preventDefault();
    if (inFlightRef.current || sent || !hasPublishedPrivacy()) return;
    if (showErrors(validateInquiry(data, step === 2 ? undefined : step))) return;
    if (step < 2) { moveTo(step + 1); return; }
    inFlightRef.current = true;
    movedRef.current = true;
    setStatus("sending");
    setSendError("");
    try {
      requestIdRef.current ||= newSubmissionId();
      await sendInquiry({ ...data, website, privacyNoticeVersion: legalPublication.privacyNoticeVersion, requestId: requestIdRef.current });
      setStatus("sent");
    } catch (error) {
      setStatus("error");
      setSendError(error.message);
      if (error.fields) showErrors(error.fields);
    } finally { inFlightRef.current = false; }
  }

  function input(name, label, optional = false, type = "text", maxLength = 100) {
    return <div className="contact-field frosted-field">
      <label htmlFor={`contact-${name}`}>{tr(label)}{optional && <span>{tr("facoltativo")}</span>}</label>
      <input id={`contact-${name}`} name={name} type={type} value={data[name]} onChange={update} required={!optional} maxLength={maxLength}
        autoComplete={{ name: "name", email: "email", company: "organization", phone: "tel" }[name]}
        autoCapitalize={type === "email" ? "none" : undefined}
        aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `contact-${name}-error` : undefined} />
      <FieldError name={name} errors={errors} />
    </div>;
  }

  function serviceChoice(service) {
    return <label key={service.value} className="contact-choice frosted-choice" data-checked={data.services.includes(service.value) || undefined}>
      <input type="checkbox" name="services" value={service.value} checked={data.services.includes(service.value)} onChange={update} aria-invalid={Boolean(errors.services)} />
      <span className="contact-choice__mark frosted-choice__mark" aria-hidden="true">{data.services.includes(service.value) && <Check size={13} strokeWidth={2.5} />}</span>
      <span className="contact-choice__label">{tr(service.label)}</span>
    </label>;
  }

  return (
    <main className="contact-page frosted-scene">
      <AuroraBackdrop />
      <div className="contact-page__layout">
      <header className="contact-page__intro frosted-intro">
        <h1>{tr("Parliamone")}</h1>
        <p>{tr("Raccontaci la tua prossima idea.")}</p>
        <div className="contact-page__alternative"><span>{tr("Preferisci scriverci direttamente?")}</span><a href={studio.email ? `mailto:${studio.email}` : whatsappHref()} target={studio.email ? undefined : "_blank"} rel={studio.email ? undefined : "noopener noreferrer"}>{tr(studio.email ? "Invia un’email " : "Scrivici su WhatsApp")}<ArrowUpRight size={16} aria-hidden="true" /></a></div>
      </header>

      <form className="contact-flow frosted-panel" ref={formRef} onSubmit={submit} noValidate aria-labelledby="contact-step-title" aria-busy={sending}>
        {!sent && <ol className="contact-flow__progress frosted-progress" aria-label={tr("Avanzamento richiesta")}>
          {steps.map((label, index) => <li key={label} aria-current={step === index ? "step" : undefined} data-complete={index < step || undefined}>
            <button type="button" onClick={() => moveTo(index)} disabled={index > step || sending}>
              {tr(label)}
            </button>
          </li>)}
        </ol>}

        <div className="contact-flow__heading frosted-step-heading">
          <h2 id="contact-step-title" tabIndex={-1} ref={headingRef}>{tr(sent ? "Il primo passo è fatto." : titles[step])}</h2>
          {!sent && <p>{tr(hints[step])}</p>}
        </div>

        {sent ? <div className="contact-flow__success" role="status">
          <span className="contact-flow__success-mark" aria-hidden="true"><Check size={28} /></span>
          <p>{tr("Grazie, ")}{data.name.trim()}{tr(". La richiesta è stata inviata. Ti risponderemo all’indirizzo che ci hai lasciato.")}</p>
          <Link className="contact-flow__next frosted-button" to="/">{tr("Torna alla home ")}<ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div> : <>
          <FormPrivacyNotice />
          <fieldset className="contact-flow__fields" disabled={sending || !hasPublishedPrivacy()}>
            <div className="contact-flow__trap" aria-hidden="true"><label htmlFor="contact-website">{tr("Lascia vuoto questo campo")}</label><input id="contact-website" name="website" value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" /></div>
            <div className="contact-flow__step" key={step}>
              {step === 0 && <fieldset className="contact-flow__group" aria-describedby={errors.services ? "contact-services-error" : undefined}>
                <legend className="sr-only">{tr("I servizi che ti interessano")}</legend>
                <div className="contact-service-areas">
                  {serviceCatalog.map(area => {
                    const chosen = area.options.some(option => data.services.includes(option.value));
                    return <div key={area.id} className="contact-service-area" data-open={openArea === area.id}>
                      <button type="button" id={`contact-area-${area.id}-heading`} className="contact-service-area__toggle" aria-expanded={openArea === area.id} aria-controls={`contact-area-${area.id}`} onClick={() => setOpenArea(current => current === area.id ? "" : area.id)}>
                        <span>{tr(area.name)}</span>{chosen && <span className="contact-service-area__selected">{tr("Selezionato")}</span>}<span className="contact-service-area__icon" aria-hidden="true" />
                      </button>
                      <div id={`contact-area-${area.id}`} hidden={openArea !== area.id} role="group" aria-labelledby={`contact-area-${area.id}-heading`}>
                        <div className="contact-flow__choices">{area.options.map(serviceChoice)}</div>
                      </div>
                    </div>;
                  })}
                  <div className="contact-service-areas__other">{tr(serviceChoice(contactServices.find(service => service.value === "other")))}</div>
                </div>
                <FieldError name="services" errors={errors} />
              </fieldset>}

              {step === 1 && <>
                <div className="contact-field frosted-field">
                  <label htmlFor="contact-message">{tr("Cosa vorresti realizzare?")}</label>
                  <textarea id="contact-message" name="message" rows={4} value={data.message} onChange={update} required minLength={10} maxLength={3000} placeholder={tr("Il progetto, la tua attività o un problema da risolvere…")} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} />
                  <FieldError name="message" errors={errors} />
                </div>
                <fieldset className="contact-flow__group contact-flow__timings" aria-describedby={errors.timing ? "contact-timing-error" : undefined}>
                  <legend>{tr("Quando vorresti partire?")}</legend>
                  <div className="contact-flow__time-grid">{contactTimings.map((timing) => <label className="contact-choice contact-choice--time frosted-choice" key={timing} data-checked={data.timing === timing || undefined}>
                    <input type="radio" name="timing" value={timing} checked={data.timing === timing} onChange={update} required aria-invalid={Boolean(errors.timing)} />
                    <span>{tr(timing)}</span><span className="contact-choice__mark frosted-choice__mark" aria-hidden="true">{data.timing === timing && <Check size={12} />}</span>
                  </label>)}</div>
                  <FieldError name="timing" errors={errors} />
                </fieldset>
              </>}

              {step === 2 && <>
                <div className="contact-flow__input-grid">
                  {tr(input("name", "Nome"))}
                  {tr(input("email", "Email", false, "email", 254))}
                  {tr(input("company", "Azienda", true, "text", 160))}
                  {tr(input("phone", "Telefono", true, "tel", 50))}
                </div>
                <div className="contact-flow__summary">
                  <div><span>{tr("Il tuo progetto")}</span><button type="button" onClick={() => moveTo(0)}>{tr("Modifica")}</button></div>
                  <p>{tr(contactServices.filter((service) => data.services.includes(service.value)).map((service) => service.label).join(" · "))}</p>
                  <small>{tr(data.timing)}</small>
                </div>

              </>}
            </div>

            {sendError && <p className="contact-flow__send-error" role="alert">{tr(sendError)}</p>}
            <div className="contact-flow__navigation" data-first={step === 0 || undefined}>
              {step > 0 && <button type="button" className="contact-flow__back frosted-back" onClick={() => moveTo(step - 1)}><ArrowLeft size={16} aria-hidden="true" />{tr("Indietro")}</button>}
              <button type="submit" className="contact-flow__next frosted-button">{tr(sending ? "Invio in corso…" : step === 2 ? "Invia richiesta" : "Continua")}<ArrowRight size={18} aria-hidden="true" /></button>
            </div>
          </fieldset>
          <span className="sr-only" role="status">{tr(sending ? "Invio della richiesta in corso." : "")}</span>
        </>}
      </form>
      </div>
    </main>
  );
}
