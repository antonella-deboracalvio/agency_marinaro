import { hasPublishedPrivacy, legalPublication } from "../../data/legal";
import FooterWordmark from "../ui/FooterWordmark";
import { Link } from "react-router-dom";
import { ArrowUp, ArrowUpRight, Mail, MoveUpRight, UsersRound } from "lucide-react";
import BrandMark from "./BrandMark";
import { studio } from "../../data/studio";
import "./Footer.css";
import {useTranslation} from "../../i18n/context.js";


const navigation = [
  { title: "Esplora", links: [{ label: "Progetti", to: "/progetti" }, { label: "Servizi", to: "/#servizi" }, { label: "Soluzioni", to: "/#soluzioni" }] },
  { title: "Studio", links: [{ label: "Il team", to: "/team" }, { label: "Il metodo", to: "/#metodo" }, { label: "Lavora con noi", to: "/team#lavora-con-noi", badge: "+" }] },
];

export default function Footer() {
  const {t:tr}=useTranslation();


  return (
    <footer className="site-footer">
      <div className="site-footer__wrap">
        <div className="site-footer__top">
          <div className="site-footer__identity">
            <Link to="/" className="site-footer__signature" aria-label={tr(studio.name + " — Home")}><BrandMark/></Link>
            <p>{tr("Design, codice e identità.")}<br />{tr("Diamo forma alla tua prossima idea.")}</p>
            <div className="site-footer__shortcuts" aria-label={tr("Collegamenti rapidi")}>
              <Link to="/contatti" aria-label={tr("Scrivici")} title={tr("Scrivici")}><Mail size={19} aria-hidden="true" /></Link>
              <Link to="/progetti" aria-label={tr("Guarda i progetti")} title={tr("Guarda i progetti")}><MoveUpRight size={20} aria-hidden="true" /></Link>
              <Link to="/team" aria-label={tr("Conosci il team")} title={tr("Conosci il team")}><UsersRound size={19} aria-hidden="true" /></Link>
            </div>
          </div>
          {navigation.map((group) => (
            <nav className="site-footer__column" key={group.title} aria-label={tr(group.title + " — footer")}>
              <h3>{tr(group.title)}</h3>
              {group.links.map((link) => <Link key={link.to} to={link.to}>
                <span>{tr(link.label)}</span>{link.badge && <span className="site-footer__badge" aria-hidden="true">{tr(link.badge)}</span>}
              </Link>)}
            </nav>
          ))}
          <div className="site-footer__column site-footer__connect">
            <h3>{tr("Parliamone")}</h3>
            <Link to="/contatti">{tr("Inizia un progetto ")}<ArrowUpRight size={16} aria-hidden="true" /></Link>
            <Link to="/contatti">{tr("Scrivici ")}<ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {tr(new Date().getFullYear())} {tr(studio.name)}{hasPublishedPrivacy() && <> · <a href={legalPublication.privacyNoticeUrl}>{tr("Privacy")}</a></>}</p>
          <button type="button" className="site-footer__back" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}>{tr("Torna su ")}<ArrowUp size={15} aria-hidden="true" /></button>
        </div>
      </div>

      <FooterWordmark/>
    </footer>
  );
}
