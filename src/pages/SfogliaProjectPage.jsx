import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Expand, X } from "lucide-react";
import { projects } from "../data/projects";
import { BRAND_NAME } from "../lib/brand";
import "./ServiceAreaPage.css";
import "./SfogliaProjectPage.css";

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
      <p>Il sito, da esplorare.</p>
      <button ref={trigger} type="button" onClick={() => setExpanded(true)}><Expand size={15} aria-hidden="true" />Ingrandisci l’immagine</button>
    </div>
    <div className="sfoglia-demo" aria-label="Presentazione del sito SFOGLIA">
      <figure className="sfoglia-demo__art">
        <img src={project.cover} srcSet={`${project.coverSmall} 720w, ${project.cover} 1448w`} sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1440px) 92vw, 1320px" width="1448" height="1086" fetchPriority="high" alt="SFOGLIA. Il mattino ha gusto: un cornetto su fondo bordeaux, seguito da un iced latte su avorio con le parole Espresso, Latte, Ghiaccio." />
      </figure>
      <nav className="sfoglia-demo__nav" aria-label="Esplora il concept SFOGLIA">
        <span>SFOGLIA</span>
        <Link to="#sfoglia-menu">Il menu <ArrowUpRight size={15} aria-hidden="true" /></Link>
        <Link to="#sfoglia-pausa">Il bar <ArrowUpRight size={15} aria-hidden="true" /></Link>
      </nav>
      <section id="sfoglia-menu" className="sfoglia-menu" aria-labelledby="sfoglia-menu-title">
        <div className="sfoglia-menu__intro"><p>Qualcosa di buono.</p><h2 id="sfoglia-menu-title">COME TI VA,<br />OGGI?</h2></div>
        <div className="sfoglia-menu__content">
          <div className="sfoglia-menu__filters" role="group" aria-label="Categorie del menu">
            {Object.keys(menu).map(name => <button key={name} type="button" aria-pressed={category === name} aria-controls="sfoglia-menu-items" onClick={() => setCategory(name)}>{name}</button>)}
          </div>
          <div id="sfoglia-menu-items" aria-live="polite" aria-atomic="true">
            <ul aria-label={category}>{menu[category].map(([name, description]) => <li key={name}><h3>{name}</h3><p>{description}</p></li>)}</ul>
          </div>
        </div>
      </section>
      <section id="sfoglia-pausa" className="sfoglia-pausa" aria-labelledby="sfoglia-pausa-title">
        <p>Il piacere delle cose semplici.</p>
        <h2 id="sfoglia-pausa-title">UN BUON INIZIO.<br /><span>IL TUO.</span></h2>
        <div><p>Un caffè al volo. Una colazione senza fretta. Un momento da tenere per sé.</p><Link to="#sfoglia-menu">Scegli la tua pausa <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
      </section>
      <div className="sfoglia-demo__end"><strong>SFOGLIA</strong><span>Caffè. Sfoglia. E il tempo che vuoi.</span></div>
    </div>
    
    {expanded && <dialog ref={dialog} className="sfoglia-art-dialog" aria-label="Immagine completa del concept SFOGLIA" onClose={() => { setExpanded(false); trigger.current?.focus(); }} onClick={event => { if (event.target === event.currentTarget) closeArtwork(); }}>
      <div><header><span>SFOGLIA — Il mattino ha gusto.</span><button type="button" autoFocus onClick={closeArtwork} aria-label="Chiudi immagine"><X size={22} /></button></header><img src={project.cover} width="1448" height="1086" alt="Immagine completa SFOGLIA: hero con cornetto e sezione iced latte." /></div>
    </dialog>}
  </>;
}

export default function SfogliaProjectPage() {
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
      <Link className="service-area__back" to="/progetti#sfoglia"><ArrowLeft size={15} aria-hidden="true" />Tutti i progetti</Link>
      <h1>SFOGLIA</h1>
      <div className="service-area__intro">
        <p className="service-area__promise">Il mattino ha gusto.</p>
        <div className="service-area__lead"><p>Un’identità decisa, una colazione in primo piano. Un sito per una caffetteria contemporanea, pensato per far venire voglia di fermarsi.</p><Link className="service-area__text-link" to="#anteprima">Esplora il concept <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
      </div>
      <dl className="sfoglia-project__facts"><div><dt>Settore</dt><dd>Caffetteria</dd></div><div><dt>Progetto</dt><dd>Concept · 2026</dd></div><div><dt>Cosa abbiamo curato</dt><dd>Direzione visiva · Web design</dd></div></dl>
    </header>
    <section className="sfoglia-showcase service-area__wrap" aria-label="Anteprima del progetto"><SfogliaDemo /></section>
    <section className="sfoglia-story" aria-labelledby="sfoglia-story-title">
      <div className="service-area__wrap">
        <div><p className="sfoglia-story__label">Il progetto</p><h2 id="sfoglia-story-title">Dietro il progetto</h2></div>
        <div className="sfoglia-story__body">
          <p>Abbiamo immaginato una caffetteria dal carattere deciso e accogliente. Il bordeaux dà personalità, l’avorio lascia respirare i contenuti. La tipografia ampia mette i prodotti al centro, mentre il menu rende semplice scegliere.</p>
          <ul className="sfoglia-palette" aria-label="Palette del progetto">
            <li><span style={{ background: "#760d1b" }} aria-hidden="true" /><span>Bordeaux</span></li>
            <li><span style={{ background: "#faf7ef" }} aria-hidden="true" /><span>Avorio</span></li>
            <li><span style={{ background: "#080808" }} aria-hidden="true" /><span>Nero</span></li>
          </ul>
        </div>
      </div>
    </section>
    <section className="service-area__closing service-area__wrap"><div><h2>Il tuo progetto.<br />Il suo carattere.</h2><p>Disegniamo un sito che faccia riconoscere la tua attività.</p></div><Link className="service-area__button" to="/contatti?area=digital">Raccontaci la tua idea <ArrowUpRight size={20} aria-hidden="true" /></Link></section>
    <nav className="service-area__others service-area__wrap" aria-label="Navigazione progetti"><Link to="/progetti"><ArrowLeft size={18} aria-hidden="true" />Torna ai progetti</Link></nav>
  </main>;
}
