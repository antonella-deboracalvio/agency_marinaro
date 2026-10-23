import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./PricingSection.css";

const pricing = [
  {
    id: "sito-vetrina", title: "Sito vetrina", price: 395,
    contact: "/contatti?servizio=web", cta: "Parliamo del tuo sito",
    features: [
      { title: "Una pagina per la tua attività", detail: "Presentazione, servizi e contatti in un percorso semplice." },
      { title: "Design su misura", detail: "Colori e caratteri del tuo brand, curati anche su mobile." },
      { title: "Contatti a un tocco", detail: "Pulsanti per chiamare, scrivere o aprire WhatsApp." },
      { title: "Messa online", detail: "Pubblichiamo il sito e lo colleghiamo al tuo dominio." },
    ],
  },
  {
    id: "sito-logo", title: "Sito + logo", price: 495, featured: true,
    contact: "/contatti?servizio=web&servizio=identity", cta: "Partiamo insieme",
    features: [
      { title: "Tutto il sito vetrina", detail: "La tua pagina, i contatti e la pubblicazione online." },
      { title: "Un logo per la tua attività", detail: "Una proposta grafica pensata insieme al sito." },
      { title: "Colori e caratteri coordinati", detail: "Un’immagine coerente sui tuoi materiali digitali." },
      { title: "File pronti da usare", detail: "Il logo in formato digitale e una breve guida all’uso." },
    ],
  },
  {
    id: "menu-digitale", title: "Menù digitale", price: 250,
    contact: "/contatti?servizio=qr", cta: "Digitalizziamo il menù",
    features: [
      { title: "Menù ordinato per categorie", detail: "Piatti, bevande e prezzi facili da consultare." },
      { title: "QR code pronto per la stampa", detail: "Da usare su tavoli, vetrine e materiali del locale." },
      { title: "Aggiornamenti senza ristampe", detail: "Piatti e prezzi aggiornabili mantenendo lo stesso QR." },
      { title: "Si apre senza app", detail: "Menù e contatti del locale direttamente sul telefono." },
    ],
  },
  {
    id: "gestionale", title: "Gestionale", price: null,
    contact: "/contatti?servizio=management", cta: "Parliamo del progetto",
    features: [
      { title: "Funzioni definite insieme", detail: "Partiamo dal tuo lavoro e scegliamo ciò che serve." },
      { title: "Clienti, scorte o prenotazioni", detail: "Organizziamo i dati utili alla tua attività." },
      { title: "Un pannello semplice", detail: "Informazioni e operazioni quotidiane nello stesso spazio." },
      { title: "Automazioni mirate", detail: "Riduciamo i passaggi ripetitivi previsti dal progetto." },
    ],
  },
];

export default function PricingSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();

  const finishReveal = () => {
    setReady(true);
    requestAnimationFrame(() => {
      // Keep keyboard navigation at the revealed heading, unless the visitor
      // has already moved to another section during the short transition.
      if (document.activeElement === document.body || sectionRef.current?.contains(document.activeElement)) {
        titleRef.current?.focus({ preventScroll: true });
      }
    });
  };

  return (
    <section ref={sectionRef} id="prezzi" className="pricing-light" data-revealed={revealed}
      aria-labelledby={ready ? "pricing-title" : "pricing-intro-title"}>
      <div id="pricing-content" className="pricing-light__content" aria-hidden={!ready} inert={!ready ? true : undefined}>
        <div className="pricing-light__wrap">
          <header className="pricing-light__heading">
            <h2 ref={titleRef} tabIndex={-1} id="pricing-title">Diamo forma <br />alla tua idea.</h2>
          </header>
          <div className="pricing-light__grid">
            {pricing.map((plan) => (
              <article className={`pricing-plan${plan.featured ? " pricing-plan--featured" : ""}`}
                key={plan.id} aria-labelledby={`plan-${plan.id}`}>
                <h3 id={`plan-${plan.id}`}>{plan.title}</h3>
                {plan.price !== null
                  ? <p className="pricing-plan__price"><span>da</span><strong>€{plan.price}</strong></p>
                  : <p className="pricing-plan__price pricing-plan__price--custom">Preventivo <br />su misura</p>}
                <div className="pricing-plan__details">
                  <p className="pricing-plan__includes">Cosa comprende</p>
                  <ul>{plan.features.map((feature) => <li key={feature.title}>
                    <strong>{feature.title}</strong><span>{feature.detail}</span>
                  </li>)}</ul>
                </div>
                <Link className="pricing-plan__cta" to={plan.contact}>{plan.cta}<ArrowUpRight size={16} aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence initial={false} onExitComplete={finishReveal}>
        {!revealed && <motion.div key="pricing-glass" className="pricing-light__veil"
          initial={false} exit={{ opacity: 0, y: reduced ? 0 : -12 }}
          transition={{ duration: reduced ? 0 : .7, ease: [0.22, 1, 0.36, 1] }}>
          <div className="pricing-light__invitation">
            <h2 id="pricing-intro-title">Prima vedi.<br />Poi decidi.</h2>
            <p><strong>Bozza e preventivo gratuiti.</strong>
              Se la proposta ti piace, procediamo.<br />Altrimenti non paghi nulla.</p>
            <button type="button" className="pricing-light__reveal" aria-controls="pricing-content"
              aria-expanded={revealed} disabled={revealed} onClick={() => setRevealed(true)}>
              Scopri prezzi e pacchetti <span aria-hidden="true"><ArrowRight size={18} strokeWidth={1.6} /></span>
            </button>
          </div>
        </motion.div>}
      </AnimatePresence>
    </section>
  );
}
