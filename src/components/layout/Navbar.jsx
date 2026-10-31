import { Link } from "react-router-dom";
import LiquidMorphFloatingMenu from "../ui/liquid-morph-floating-menu";
import BrandMark from "./BrandMark";
import { BRAND_NAME } from "../../lib/brand";
import "./Navbar.css";
import {useTranslation} from "../../i18n/context.js";


export default function Navbar() {
  const {t:tr}=useTranslation();

  return <><header id="inizio" className="site-navbar">
    <nav aria-label={tr("Navigazione principale")} className="site-navbar__inner">
      <Link to="/" className="site-brand-link" aria-label={tr(`${BRAND_NAME} — Home`)}><BrandMark /></Link>
    </nav>
  </header><LiquidMorphFloatingMenu /></>;
}
