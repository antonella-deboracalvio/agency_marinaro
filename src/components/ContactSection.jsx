import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { studio } from "../data/studio";
import "./ContactSection.css";
import {useTranslation} from "../i18n/context.js";


export default function ContactSection() {
  const {t:tr}=useTranslation();

  const whatsappNumber = studio.whatsappNumber?.replace(/\D/g, "");
  const hasWhatsApp = /^[1-9]\d{7,14}$/.test(whatsappNumber || "");

  return (
    <section id="contatti" className="contact-cta" aria-labelledby="contact-title">
      <div className="contact-cta__content">
        <h2 id="contact-title">{tr("Creiamo qualcosa")}<br /><span>{tr("che resti.")}</span></h2>
        <div className="contact-cta__actions">
          <Link className="contact-cta__button" to="/contatti">{tr("Parliamone ")}<ArrowUpRight size={18} aria-hidden="true" /></Link>
          {hasWhatsApp && <a className="contact-cta__button contact-cta__button--secondary" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">{tr("WhatsApp ")}<ArrowUpRight size={18} aria-hidden="true" /></a>}
        </div>
      </div>
    </section>
  );
}
