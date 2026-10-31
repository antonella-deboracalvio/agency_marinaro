import { Link } from "react-router-dom";
import {useTranslation} from "../../i18n/context.js";


export default function ProjectPhoneMockup({project,position,index,active,onSelect,onPointerEnter,onPointerLeave}){
  const {t:tr}=useTranslation();

  const externalUrl=project.previewUrl||project.liveUrl;
  const cta=<span>{tr("Guarda il progetto ")}<i>↗</i></span>;
  const projectCta=externalUrl?<a className="project-phone__cta" href={externalUrl} target="_blank" rel="noopener noreferrer" aria-label={tr(`Guarda il progetto ${project.title}`)}>{tr(cta)}</a>:<Link className="project-phone__cta" to="/progetti" aria-label={tr(`Guarda il progetto ${project.title}`)}>{tr(cta)}</Link>;
  return <article data-index={index} className={`project-phone-slot project-phone-slot--${position}${active?" is-active":" is-muted"}`} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
    <div className="project-phone-motion">
    <button type="button" className="project-phone" onClick={onSelect} onFocus={onSelect} aria-label={tr(`Seleziona il progetto ${project.title}`)} aria-pressed={active}>
      <span className="project-phone__device">
        <span className="project-phone__button project-phone__button--left" aria-hidden="true"/><span className="project-phone__button project-phone__button--right" aria-hidden="true"/>
        <span className="project-phone__screen"><span className="project-phone__island" aria-hidden="true"/><img src={project.cover} alt={tr(`Schermata del progetto ${project.title}`)} width="720" height="1440" loading="lazy" decoding="async" className="project-phone__image"/><span className="project-phone__reflection" aria-hidden="true"/></span>
      </span>
    </button>
    <div className="project-phone__caption"><div className="project-phone__name"><i aria-hidden="true"/><h3>{tr(project.title)}</h3></div><p>{tr(project.category)} · {tr(project.sector)}</p>{tr(projectCta)}</div>
    </div>
  </article>;
}
