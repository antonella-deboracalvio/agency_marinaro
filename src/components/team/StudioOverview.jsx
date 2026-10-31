import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import StudioProjectCard from "./StudioProjectCard";
import StudioNotifications from "./StudioNotifications";
import "./StudioOverview.css";
import {useTranslation} from "../../i18n/context.js";


export default function StudioOverview({ studio }) {
  const {t:tr}=useTranslation();

  return (
    <section className="studio-about" aria-label={tr("Lo studio Marinaro")}>
      <header className="studio-about__intro"><p>{tr("Il nostro approccio")}</p><h2>{tr("Le idee si vedono.")}</h2><span>{tr("Design, codice e identità. Dall’idea a qualcosa di concreto.")}</span></header>
      <div className="studio-bento">
        <StudioProjectCard />
        <article className="studio-stat studio-stat--days">
          <p className="studio-stat__display"><strong>{tr(studio.deliveryDays)}</strong><span>{tr("giorni")}</span></p>
          <div className="studio-stat__copy"><h2>{tr("Per essere online")}</h2></div>
        </article>
        <Link className="studio-stat studio-stat--projects" to="/progetti" aria-label={tr(`${studio.projects} progetti realizzati. Guarda i nostri lavori`)}>
          <p className="studio-stat__display"><strong>{tr(studio.projects)}</strong></p>
          <div className="studio-stat__copy"><h2>{tr("Progetti realizzati")}</h2></div>
          <ArrowUpRight className="studio-stat__arrow" size={23} strokeWidth={1.8} aria-hidden="true" />
        </Link>
        <StudioNotifications />
        <Link className="studio-bento__join" to="/contatti">
          <span className="studio-join__copy"><strong>{tr("La prossima")}<br />{tr("idea è la tua.")}</strong><small>{tr("Parliamone insieme")}</small></span>
          <ArrowUpRight className="studio-join__arrow" size={58} strokeWidth={1.5} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
