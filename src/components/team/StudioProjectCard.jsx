import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import campaign from "../../assets/team/marinaro-street-campaign.webp";
import campaignSmall from "../../assets/team/marinaro-street-campaign-small.webp";
import "./StudioProjectCard.css";
import {useTranslation} from "../../i18n/context.js";


export default function StudioProjectCard() {
  const {t:tr}=useTranslation();

  return (
    <Link to="/contatti" className="studio-bento__case-study" aria-label={tr("Are people ignoring your brand? We can fix that. Parliamone con Marinaro Digital Studio")}>
      <img className="studio-case__campaign" src={campaign} srcSet={`${campaignSmall} 720w, ${campaign} 1254w`}
        sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 900px) 48vw, 600px"
        alt={tr("Cartellone Marinaro Digital Studio: Are people ignoring your brand? We can fix that. Un ragazzo con zaino passa davanti al manifesto.")}
        width="1254" height="1254" loading="lazy" decoding="async" />
      <span className="studio-case__transparency">{tr("Visual generato con AI")}</span>
      <span className="studio-case__link" aria-hidden="true"><ArrowUpRight size={24} strokeWidth={1.8} /></span>
    </Link>
  );
}
