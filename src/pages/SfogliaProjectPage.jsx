import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Expand, X } from "lucide-react";
import { projects } from "../data/projects";
import { BRAND_NAME } from "../lib/brand";
import "./ServiceAreaPage.css";
import "./SfogliaProjectPage.css";
import {useTranslation} from "../i18n/context.js";


const project = projects.find(item => item.id === "sfoglia");
const menu = {
  "Caffè": [
    ["Espresso", "Il classico, senza aggiungere altro."],
    ["Cappuccino", "Espresso, latte e una schiuma morbida."],
    ["Iced latte", "Espresso, latte e ghiaccio. Il nostro lato fresco."],
  ],
  "Cornetti": [
    ["Il semplice", "Sfoglia al burro, da gustare così com’è."],
    ["Alla crema", "Un cuore di crema, dentro una sfoglia fragrante."],
    ["Al cioccolato", "Per chi al mattino sceglie qualcosa in più."],
  ],
  "Bevande": [
    ["Spremuta", "Una pausa agli agrumi."],
    ["Tè e infusi", "Da sorseggiare, con calma."],
    ["Cioccolata", "Densa, calda, da godersi fino in fondo."],
  ],
};

function SfogliaDemo() {
  const {t:tr}=useTranslation();

  const [category, setCategory] = useState("Caffè");
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef(null);
  const trigger = useRef(null);

  useEffect(() => {
    if (!expanded) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    return () => { document.body.style.overflow = previous; };
  }, [expanded]);

  function closeArtwork() {
    dialog.current?.close();
    setExpanded(false);
    trigger.current?.focus();
  }

  return <>
    <div className="sfoglia-preview-heading" id="anteprima">
      <p>{tr("Il sito, da esplorare.")}</p>
      <button ref={trigger} type="button" onClick={() => setExpanded(true)}><Expand size={15} aria-hidden="true" />{tr("Ingrandisci l’immagine")}</button>
    </div>
    <div className="sfoglia-demo" aria-label={tr("Presentazione del sito SFOGLIA")}>
      <p className="visual-transparency">{tr("Progetto dimostrativo con visual generati con AI; non è una commessa cliente.")}</p>
      <figure className="sfoglia-demo__art">
        <img src={project.cover} srcSet={`${project.coverSmall} 720w, ${project.cover} 1448w`} sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1440px) 92vw, 1320px" width="1448" height="1086" fetchPriority="high" alt={tr("SFOGLIA. Il mattino ha gusto: un cornetto su fondo bordeaux, seguito da un iced latte su avorio con le parole Espresso, Latte, Ghiaccio.")} />
      </figure>
      <nav className="sfoglia-demo__nav" aria-label={tr("Esplora il concept SFOGLIA")}>
        <span>{tr("SFOGLIA")}</span>
        <Link to="#sfoglia-menu">{tr("Il menu ")}<ArrowUpRight size={15} aria-hidden="true" /></Link>
        <Link to="#sfoglia-pausa">{tr("Il bar ")}<ArrowUpRight size={15} aria-hidden="true" /></Link>
      </nav>
      <section id="sfoglia-menu" className="sfoglia-menu" aria-labelledby="sfoglia-menu-title">
        <div className="sfoglia-menu__intro"><p>{tr("Qualcosa di buono.")}</p><h2 id="sfoglia-menu-title">{tr("COME TI VA,")}<br />{tr("OGGI?")}</h2></div>
        <div className="sfoglia-menu__content">
          <div className="sfoglia-menu__filters" role="group" aria-label={tr("Categorie del menu")}>
            {Object.keys(menu).map(name => <button key={name} type="button" aria-pressed={category === name} aria-controls="sfoglia-menu-items" onClick={() => setCategory(name)}>{tr(name)}</button>)}
          </div>
          <div id="sfoglia-menu-items" aria-live="polite" aria-atomic="true">
            <ul aria-label={tr(category)}>{menu[category].map(([name, description]) => <li key={name}><h3>{tr(name)}</h3><p>{tr(description)}</p></li>)}</ul>
          </div>
        </div>
      </section>
      <section id="sfoglia-pausa" className="sfoglia-pausa" aria-labelledby="sfoglia-pausa-title">
        <p>{tr("Il piacere delle cose semplici.")}</p>
        <h2 id="sfoglia-pausa-title">{tr("UN BUON INIZIO.")}<br /><span>{tr("IL TUO.")}</span></h2>
        <div><p>{tr("Un caffè al volo. Una colazione senza fretta. Un momento da tenere per sé.")}</p><Link to="#sfoglia-menu">{tr("Scegli la tua pausa ")}<ArrowUpRight size={18} aria-hidden="true" /></Link></div>
      </section>
      <div className="sfoglia-demo__end"><strong>{tr("SFOGLIA")}</strong><span>{tr("Caffè. Sfoglia. E il tempo che vuoi.")}</span></div>
    </div>
    
    {expanded && <dialog ref={dialog} className="sfoglia-art-dialog" aria-label={tr("Immagine completa del concept SFOGLIA")} onClose={() => { setExpanded(false); trigger.current?.focus(); }} onClick={event => { if (event.target === event.currentTarget) closeArtwork(); }}>
      <div><header><span>{tr("SFOGLIA — Il mattino ha gusto.")}</span><button type="button" autoFocus onClick={closeArtwork} aria-label={tr("Chiudi immagine")}><X size={22} /></button></header><img src={project.cover} width="1448" height="1086" alt={tr("Immagine completa SFOGLIA: hero con cornetto e sezione iced latte.")} /></div>
    </dialog>}
  </>;
}

export default function SfogliaProjectPage() {
  const {t:tr}=useTranslation();

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content");
    document.title = `SFOGLIA — Progetti — ${BRAND_NAME}`;
    description?.setAttribute("content", project.description);
    return () => {
      document.title = previousTitle;
      if (previousDescription != null) description?.setAttribute("content", previousDescription);
    };
  }, []);

  return <main className="service-area sfoglia-project" style={{ "--area-accent": "#bba6d8" }}>
    <header className="service-area__hero service-area__wrap">
      <Link className="service-area__back" to="/progetti#sfoglia"><ArrowLeft size={15} aria-hidden="true" />{tr("Tutti i progetti")}</Link>
      <h1>{tr("SFOGLIA")}</h1>
      <div className="service-area__intro">
        <p className="service-area__promise">{tr("Il mattino ha gusto.")}</p>
        <div className="service-area__lead"><p>{tr("Un’identità decisa, una colazione in primo piano. Un sito per una caffetteria contemporanea, pensato per far venire voglia di fermarsi.")}</p><Link className="service-area__text-link" to="#anteprima">{tr("Esplora il concept ")}<ArrowUpRight size={18} aria-hidden="true" /></Link></div>
      </div>
      <dl className="sfoglia-project__facts"><div><dt>{tr("Settore")}</dt><dd>{tr("Caffetteria")}</dd></div><div><dt>{tr("Progetto")}</dt><dd>{tr("Concept · 2026")}</dd></div><div><dt>{tr("Cosa abbiamo curato")}</dt><dd>{tr("Direzione visiva · Web design")}</dd></div></dl>
    </header>
    <section className="sfoglia-showcase service-area__wrap" aria-label={tr("Anteprima del progetto")}><SfogliaDemo /></section>
    <section className="sfoglia-story" aria-labelledby="sfoglia-story-title">
      <div className="service-area__wrap">
        <div><p className="sfoglia-story__label">{tr("Il progetto")}</p><h2 id="sfoglia-story-title">{tr("Dietro il progetto")}</h2></div>
        <div className="sfoglia-story__body">
          <p>{tr("Abbiamo immaginato una caffetteria dal carattere deciso e accogliente. Il bordeaux dà personalità, l’avorio lascia respirare i contenuti. La tipografia ampia mette i prodotti al centro, mentre il menu rende semplice scegliere.")}</p>
          <ul className="sfoglia-palette" aria-label={tr("Palette del progetto")}>
            <li><span style={{ background: "#760d1b" }} aria-hidden="true" /><span>{tr("Bordeaux")}</span></li>
            <li><span style={{ background: "#faf7ef" }} aria-hidden="true" /><span>{tr("Avorio")}</span></li>
            <li><span style={{ background: "#080808" }} aria-hidden="true" /><span>{tr("Nero")}</span></li>
          </ul>
        </div>
      </div>
    </section>
    <section className="service-area__closing service-area__wrap"><div><h2>{tr("Il tuo progetto.")}<br />{tr("Il suo carattere.")}</h2><p>{tr("Disegniamo un sito che faccia riconoscere la tua attività.")}</p></div><Link className="service-area__button" to="/contatti?area=digital">{tr("Raccontaci la tua idea ")}<ArrowUpRight size={20} aria-hidden="true" /></Link></section>
    <nav className="service-area__others service-area__wrap" aria-label={tr("Navigazione progetti")}><Link to="/progetti"><ArrowLeft size={18} aria-hidden="true" />{tr("Torna ai progetti")}</Link></nav>
  </main>;
}
