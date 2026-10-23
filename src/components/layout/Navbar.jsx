import { Link } from "react-router-dom";
import LiquidMorphFloatingMenu from "../ui/liquid-morph-floating-menu";
import BrandMark from "./BrandMark";
import { BRAND_NAME } from "../../lib/brand";
import "./Navbar.css";

export default function Navbar() {
  return <><header id="inizio" className="site-navbar">
    <nav aria-label="Navigazione principale" className="site-navbar__inner">
      <Link to="/" className="site-brand-link" aria-label={`${BRAND_NAME} — Home`}><BrandMark /></Link>
    </nav>
  </header><LiquidMorphFloatingMenu /></>;
}
