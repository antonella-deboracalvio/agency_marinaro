import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { BRAND_NAME } from "../lib/brand";
import { serviceCatalog, inquiryHref } from "../data/service-catalog";
import { servicePages } from "../data/service-pages";
import ServiceGallery from "../components/services/ServiceGallery";
import ServiceVisualPair from "../components/services/ServiceVisualPair";
import "./ServiceAreaPage.css";

export default function ServiceAreaPage({ areaId }) {
  const area = serviceCatalog.find(item => item.id === areaId);
  const page = servicePages[areaId];

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content");
    document.title = `${area.name} — ${BRAND_NAME}`;
    description?.setAttribute("content", page.description);
    return () => {
      document.title = previousTitle;
      if (previousDescription !== null && previousDescription !== undefined) description?.setAttribute("content", previousDescription);
    };
  }, [area.name, page.description]);

  return <main className={`service-area service-area--${area.id}`} style={{ "--area-accent": page.accent }}>
    <header className="service-area__hero service-area__wrap">
      <Link className="service-area__back" to="/#servizi"><ArrowLeft size={15} aria-hidden="true" />Tutti i servizi</Link>
      <h1>{area.name}</h1>
      <div className="service-area__intro">
        <p className="service-area__promise">{page.title}</p>
        <div className="service-area__lead"><p>{page.description}</p></div>
      </div>
    </header>

    <ServiceGallery key={area.id} visuals={page.gallery} name={area.name} />

    <nav className="service-area__index service-area__wrap" aria-label={`Esplora i servizi ${area.name}`}>
      {page.sections.map(section => <Link key={section.id} to={`${area.href}#${section.id}`}>{section.label}<ArrowRight size={14} aria-hidden="true" /></Link>)}
    </nav>

    <div className="service-area__sections service-area__wrap">
      {page.sections.map(section => <section key={section.id} id={section.id} className="service-detail" aria-labelledby={`${section.id}-title`}>
        <div className="service-detail__copy">
          <p className="service-detail__label">{section.label}</p>
          <h2 id={`${section.id}-title`}>{section.title}</h2>
          <div className="service-detail__description">{section.paragraphs.map(text => <p key={text}>{text}</p>)}</div>
          <div className="service-detail__includes"><h3>{section.listTitle}</h3><ul>{section.items.map(item => <li key={item}>{item}</li>)}</ul></div>
          <Link className="service-area__text-link" to={inquiryHref(section.service)}>{section.cta}<ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
        <ServiceVisualPair key={`${area.id}-${section.id}`} section={section} />
      </section>)}
    </div>

    {page.kits && <section className="service-kits service-area__wrap" aria-labelledby="social-kits-title">
      <div className="service-kits__heading"><h2 id="social-kits-title">Trova il tuo ritmo.</h2><p>Tre modi per dare forma ai tuoi contenuti.</p></div>
      <div className="service-kits__grid">{page.kits.map(kit => <article key={kit.name}>
        <h3>{kit.name}</h3><p>{kit.text}</p><ul>{kit.items.map(item => <li key={item}>{item}</li>)}</ul>
        <Link className="service-area__text-link" to={inquiryHref("social")}>Parliamone<ArrowUpRight size={18} aria-hidden="true" /></Link>
      </article>)}</div>
      <p className="service-kits__note">Creiamo il materiale. La gestione del profilo e la pubblicazione restano a te.</p>
    </section>}

    <section className="service-delivery" aria-labelledby="service-delivery-title">
      <div className="service-area__wrap">
        <div className="service-delivery__intro"><h2 id="service-delivery-title">{page.delivery.title}</h2><p>{page.delivery.text}</p></div>
        <div className="service-delivery__grid">{page.delivery.items.map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.text}</p></div>)}</div>
      </div>
    </section>

    <section className="service-area__closing service-area__wrap" aria-labelledby="service-closing-title">
      <div><h2 id="service-closing-title">{page.closing.title}</h2><p>{page.closing.text}</p></div>
      <Link className="service-area__button" to={`/contatti?area=${area.id}`}>Raccontaci il progetto<ArrowUpRight size={20} aria-hidden="true" /></Link>
    </section>
    <nav className="service-area__others service-area__wrap" aria-label="Le altre aree dello studio">
      <p>Esplora anche</p><div>{serviceCatalog.filter(item => item.id !== area.id).map(item => <Link key={item.id} to={item.href}>{item.name}<ArrowUpRight size={19} aria-hidden="true" /></Link>)}</div>
    </nav>
  </main>;
}
