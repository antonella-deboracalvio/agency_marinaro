import { Link } from "react-router-dom";
import { ArrowUpRight, Plus } from "lucide-react";
import { founders, socialMember, studio } from "../../data/studio";
import "./TeamPreview.css";
import InstagramTile from "../ui/InstagramTile";

export default function TeamPreview() {
  return (
    <><section id="team" className="team-preview" aria-labelledby="team-preview-title">
      <div className="team-preview__card">
        <div className="team-preview__avatars" aria-label={`Il team e le collaborazioni di ${studio.name}`}>
          {founders.map((member) => (
            <Link key={member.id} to={`/team#${member.id}`} className={`team-avatar team-avatar--${member.id}`} aria-label={`Conosci il ${member.role}`}>
              <img src={member.avatar} alt="" width="160" height="160" loading="lazy" decoding="async" />
              <span className="team-avatar__tooltip">{member.role}</span>
            </Link>
          ))}
          <Link to="/team#lavora-con-noi" className="team-avatar team-avatar--social" aria-label="Collabora con noi per i social media">
            <img src={socialMember.image} alt="" width="240" height="240" loading="lazy" decoding="async" />
            <span className="team-avatar__tooltip">Social media · Collabora con noi</span>
          </Link>
          <Link to="/team#lavora-con-noi" className="team-avatar team-avatar--join" aria-label="Lavora con noi: vai alla candidatura">
            <Plus size={23} strokeWidth={1.5} aria-hidden="true" />
            <span className="team-avatar__tooltip">Il prossimo potresti essere tu</span>
          </Link>
        </div>
        <div className="team-preview__copy"><h2 id="team-preview-title">Dietro il tuo progetto.</h2><p>Design e sviluppo, in prima persona.</p></div>
        <Link to="/team" className="team-preview__cta">Conoscici <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
    </section><section className="studio-social" aria-labelledby="studio-social-title"><div className="studio-social__intro"><p>DALLO STUDIO, OGNI GIORNO.</p><h2 id="studio-social-title">Ci vediamo<br/><span>sui social.</span></h2><p>Progetti, idee e quello che succede dietro le quinte.</p></div><InstagramTile/></section></>
  );
}
