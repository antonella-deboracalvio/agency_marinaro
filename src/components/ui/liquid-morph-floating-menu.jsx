import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import "./liquid-morph-floating-menu.css";

import LanguageSwitcher, { Flag } from "../../i18n/LanguageSwitcher";
import { useTranslation } from "../../i18n/context";

const ease = [0.22, 1, 0.36, 1];
const navigationLinks = [
  { label: "Works", to: "/progetti" },
  { label: "Servizi", to: "/#servizi" },
  { label: "Team", to: "/team" },
  { label: "Soluzioni", to: "/#soluzioni" },
  { label: "Lavora con noi", to: "/team#lavora-con-noi" },
];

export default function LiquidMorphFloatingMenu() {
  const {t:tr}=useTranslation();

  const {language,t} = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const openerRef = useRef(null);
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const menuId = useId();
  const location = useLocation();
  const reduced = useReducedMotion();
  const isActive = (to) => {
    const [pathname, hash] = to.split("#");
    return location.pathname === pathname && (hash ? location.hash === `#${hash}` : !location.hash);
  };

  const openMenu = event => { openerRef.current=event.currentTarget; setIsOpen(true); };
  const closeMenu = () => {
    setIsOpen(false);
    requestAnimationFrame(() => (openerRef.current || triggerRef.current)?.focus({ preventScroll: true }));
  };

  useEffect(() => { setIsOpen(false); }, [location.key]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const root = document.documentElement;
    const oldOverflow = root.style.overflow;
    const oldGutter = root.style.scrollbarGutter;
    root.style.scrollbarGutter = "stable";
    root.style.overflow = "hidden";
    const focusFrame = requestAnimationFrame(() => closeRef.current?.focus({ preventScroll: true }));
    const handleKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        requestAnimationFrame(() => (openerRef.current || triggerRef.current)?.focus({ preventScroll: true }));
      }
      if (event.key !== "Tab") return;
      const controls = [...panelRef.current.querySelectorAll("a[href], button:not(:disabled)")]
        .filter((control) => control.getClientRects().length > 0);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first?.focus();
      } else if (!panelRef.current.contains(document.activeElement)) {
        event.preventDefault(); first?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      cancelAnimationFrame(focusFrame);
      root.style.overflow = oldOverflow;
      root.style.scrollbarGutter = oldGutter;
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  return (
    <div className="liquid-menu" data-open={isOpen} data-lenis-prevent>
      <button className="liquid-menu__language-trigger" type="button" translate="no"
        aria-label={t('Scegli la lingua')} aria-expanded={isOpen} aria-controls={menuId}
        tabIndex={isOpen ? -1 : 0} aria-hidden={isOpen || undefined} onClick={openMenu}>
        <Flag code={language}/><span>{language.toUpperCase()}</span>
      </button>
      <button ref={triggerRef} className="liquid-menu__trigger" type="button"
        aria-label={tr("Apri menu")} aria-expanded={isOpen} aria-controls={menuId}
        tabIndex={isOpen ? -1 : 0} aria-hidden={isOpen || undefined}
        onClick={openMenu}>
        <span className="liquid-menu__icon" aria-hidden="true"><span /><span /><span /></span>
      </button>
      <motion.div className="liquid-menu__backdrop" aria-hidden="true" initial={false}
        animate={{ opacity: isOpen ? 1 : 0 }} transition={{ duration: reduced ? 0 : .25 }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }} onClick={closeMenu} />
      <motion.div ref={panelRef} id={menuId} className="liquid-menu__panel"
        role="dialog" aria-label={t("Menu principale")} aria-modal={isOpen || undefined}
        aria-hidden={!isOpen} inert={!isOpen ? true : undefined}
        initial={false} animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 32, y: isOpen ? 0 : -8, scale: isOpen ? 1 : .98 }}
        transition={{ duration: reduced ? 0 : isOpen ? .45 : .2, ease }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}>
        <div className="liquid-menu__top"><button ref={closeRef} type="button" onClick={closeMenu} className="liquid-menu__close" aria-label={tr("Chiudi menu")}>{tr("Chiudi ")}<span aria-hidden="true">×</span></button></div>
        <div className="liquid-menu__scroll" data-lenis-prevent>
          <LanguageSwitcher/>
          <div className="liquid-menu__navigation">
            <nav className="liquid-menu__links" aria-label={tr("Navigazione del sito")}>
              {navigationLinks.map((item) => <Link key={item.to} to={item.to} onClick={closeMenu}
                aria-current={isActive(item.to) ? item.to.includes("#") ? "location" : "page" : undefined}>
                {tr(item.label)}
              </Link>)}
            </nav>
            <div className="liquid-menu__footer">
              <Link to="/contatti" className="liquid-menu__contact" onClick={closeMenu}>{tr("Parliamone ")}<span aria-hidden="true">↗</span></Link>
              <Link to="/" className="liquid-menu__home" onClick={closeMenu}>{tr("Torna alla home")}</Link>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
