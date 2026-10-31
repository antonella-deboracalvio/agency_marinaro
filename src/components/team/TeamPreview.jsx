import { Link } from "react-router-dom";
import { ArrowUpRight, Plus, MessagesSquare } from "lucide-react";
import { founders, studio } from "../../data/studio";
import "./TeamPreview.css";
import SocialShowcase from "../ui/SocialShowcase";
import {useTranslation} from "../../i18n/context.js";


export default function TeamPreview() {
  const {t:tr}=useTranslation();

  return (
    <><section id="team" className="team-preview" aria-labelledby="team-preview-title">
      <div className="team-preview__card">
        <div className="team-preview__avatars" aria-label={tr(`Il team e le collaborazioni di ${studio.name}`)}>
          {founders.map((member) => (
            <Link key={member.id} to={`/team#${member.id}`} className={`team-avatar team-avatar--${member.id}`} aria-label={tr(`Conosci il ${member.role}`)}>
              <img src={member.avatar} alt={tr("")} width="160" height="160" loading="lazy" decoding="async" />
              <span className="team-avatar__tooltip">{tr(member.role)}</span>
            </Link>
          ))}
          <Link to="/team#lavora-con-noi" className="team-avatar team-avatar--social" aria-label={tr("Collabora con noi per i social media")}>
            <MessagesSquare size={27} strokeWidth={1.5} aria-hidden="true" />
            <span className="team-avatar__tooltip">{tr("Social media · Collabora con noi")}</span>
          </Link>
          <Link to="/team#lavora-con-noi" className="team-avatar team-avatar--join" aria-label={tr("Lavora con noi: vai alla candidatura")}>
            <Plus size={23} strokeWidth={1.5} aria-hidden="true" />
            <span className="team-avatar__tooltip">{tr("Il prossimo potresti essere tu")}</span>
          </Link>
        </div>
        <div className="team-preview__copy"><h2 id="team-preview-title">{tr("Dietro il tuo progetto.")}</h2><p>{tr("Design e sviluppo, in prima persona.")}</p></div>
        <Link to="/team" className="team-preview__cta">{tr("Conoscici ")}<ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
    </section><section className="studio-social" aria-labelledby="studio-social-title"><div className="studio-social__intro"><p>{tr("DALLO STUDIO, OGNI GIORNO.")}</p><h2 id="studio-social-title">{tr("Ci vediamo")}<br/><span>{tr("sui social.")}</span></h2><p>{tr("Progetti, idee e quello che succede dietro le quinte.")}</p></div><SocialShowcase/></section></>
  );
}
