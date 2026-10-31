import "./WhyChooseUs.css";
import {useTranslation} from "../i18n/context.js";


const principles = [
  {
    label: "IDENTIT\u00c0",
    title: "Design su misura",
    text: "Ogni progetto parte da zero, costruito attorno alla tua identità.",
  },
  {
    label: "FUNZIONE",
    title: "Soluzioni pratiche",
    text: "Siti, loghi, QR menu: strumenti che funzionano davvero.",
  },
  {
    label: "PERSONE",
    title: "Supporto diretto",
    text: "Parli sempre con noi, nessun intermediario.",
  },
  {
    label: "IMPATTO",
    title: "Risultati concreti",
    text: "Misuriamo il successo in clienti conquistati, non like.",
  },
];

export default function WhyChooseUs() {
  const {t:tr}=useTranslation();

  return (
    <section className="why-section" aria-labelledby="why-title">
      <div className="why-inner">
        <div className="why-header">
          <p className="why-eyebrow">{tr("Perché noi")}</p>
          <h2 id="why-title" className="why-title">{tr("Design su misura.")}<br />
            <span className="why-title__accent">{tr("Risultati concreti.")}</span>
          </h2>
        </div>

        <div className="why-grid">
          {principles.map(({ label, title, text }) => (
            <article className="why-principle" key={title}>
              <div className="why-principle__content">
                <p className="why-principle__label">{tr(label)}</p>
                <h3 className="why-principle__title">{tr(title)}</h3>
                <p className="why-principle__text">{tr(text)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
