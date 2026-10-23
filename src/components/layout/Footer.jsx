import { useId } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, ArrowUpRight, Mail, MoveUpRight, UsersRound } from "lucide-react";
import BrandMark from "./BrandMark";
import { studio } from "../../data/studio";
import "./Footer.css";

const navigation = [
  { title: "Esplora", links: [{ label: "Progetti", to: "/progetti" }, { label: "Servizi", to: "/#servizi" }, { label: "Pacchetti", to: "/#prezzi" }] },
  { title: "Studio", links: [{ label: "Il team", to: "/team" }, { label: "Il metodo", to: "/#metodo" }, { label: "Lavora con noi", to: "/team#lavora-con-noi", badge: "+" }] },
];

export default function Footer() {
  const gradientId = useId();
  return (
    <footer className="site-footer">
      <div className="site-footer__wrap">
        <div className="site-footer__top">
          <div className="site-footer__identity">
            <Link to="/" className="site-footer__signature" aria-label={studio.name + " — Home"}><BrandMark/></Link>
            <p>Design, codice e identità.<br />Diamo forma alla tua prossima idea.</p>
            <div className="site-footer__shortcuts" aria-label="Collegamenti rapidi">
              <a href={"mailto:" + studio.email} aria-label="Scrivici via email" title="Scrivici via email"><Mail size={19} aria-hidden="true" /></a>
              <Link to="/progetti" aria-label="Guarda i progetti" title="Guarda i progetti"><MoveUpRight size={20} aria-hidden="true" /></Link>
              <Link to="/team" aria-label="Conosci il team" title="Conosci il team"><UsersRound size={19} aria-hidden="true" /></Link>
            </div>
          </div>
          {navigation.map((group) => (
            <nav className="site-footer__column" key={group.title} aria-label={group.title + " — footer"}>
              <h3>{group.title}</h3>
              {group.links.map((link) => <Link key={link.to} to={link.to}>
                <span>{link.label}</span>{link.badge && <span className="site-footer__badge" aria-hidden="true">{link.badge}</span>}
              </Link>)}
            </nav>
          ))}
          <div className="site-footer__column site-footer__connect">
            <h3>Parliamone</h3>
            <Link to="/contatti">Inizia un progetto <ArrowUpRight size={16} aria-hidden="true" /></Link>
            <a href={"mailto:" + studio.email}>Scrivici <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} {studio.name}</p>
          <button type="button" className="site-footer__back" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}>Torna su <ArrowUp size={15} aria-hidden="true" /></button>
        </div>
      </div>

      <div className="site-footer__wordmark" aria-hidden="true">
        <svg viewBox="0 0 1440 280" focusable="false">
          <defs>
            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#bbb8c2" stopOpacity=".72" />
              <stop offset="44%" stopColor="#bbb8c2" stopOpacity=".4" />
              <stop offset="100%" stopColor="#bbb8c2" stopOpacity="0" />
            </linearGradient>
          </defs>
          <text x="720" y="253" textAnchor="middle" textLength="1360" lengthAdjust="spacingAndGlyphs"
            fill="none" stroke={"url(#" + gradientId + ")"} strokeWidth="1.2" vectorEffect="non-scaling-stroke"
            fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="262" letterSpacing="-10">MARINARO</text>
        </svg>
      </div>
    </footer>
  );
}
