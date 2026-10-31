import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { founders, studio } from "../data/studio";
import CareersForm from "../components/team/CareersForm";
import StudioOverview from "../components/team/StudioOverview";
import "./TeamPage.css";
import {useTranslation} from "../i18n/context.js";


export default function TeamPage() {
  const {t:tr}=useTranslation();

  useEffect(() => {
    const previous = document.title;
    document.title = `Il team — ${studio.name}`;
    return () => { document.title = previous; };
  }, []);

  return (
    <main className="team-page font-sans" data-page="marinaro-v22">
      <section className="team-intro team-page__wrap" aria-labelledby="team-page-title">
        <Link className="team-back" to="/"><ArrowLeft size={16} aria-hidden="true" />{tr(" Torna alla home")}</Link>
        <header className="team-intro__heading">
          <h1 id="team-page-title">{tr("Dietro")}<br /><span>{tr("ci siamo noi")}</span></h1>
          <p>{tr("Seguiamo ogni progetto in prima persona,")}<br className="team-desktop-break" />{tr(" dall’idea alla messa online.")}</p>
        </header>

        <div className="founders-grid">
          {founders.map((member) => (
            <article id={member.id} className={`founder-card founder-card--${member.shape}`} key={member.id}>
              <div className="founder-card__portrait">
                <span className="founder-card__shape" aria-hidden="true" />
                <img src={member.image} srcSet={`${member.smallImage} 480w, ${member.image} ${member.imageWidth || 840}w`} sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1100px) 43vw, 440px" alt={tr(member.illustrative ? "Ritratto" : member.name || member.role)} width={member.imageWidth || 840} height={member.imageHeight || 840} decoding="async" />
              </div>
              <div className="founder-card__text">
                <p className="founder-card__role">{tr(member.role)}</p>
                <h2>{tr(member.name || member.title)}</h2>
                <p className="founder-card__description">{tr(member.description)}</p>
              </div>
            </article>
          ))}
        </div>
        

      </section>

      <StudioOverview studio={studio} />

      <CareersForm />
    </main>
  );
}
