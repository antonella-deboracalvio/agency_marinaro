import MarinaroWordmark from "./ui/MarinaroWordmark";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import EditorialTitle from "./ui/EditorialTitle";
import TechText from "./ui/TechText";
import { observeBrandAutoplay } from "../lib/brand-autoplay";
import tube from "../assets/brands/marinaro-tube.webp";
import tubeSmall from "../assets/brands/marinaro-tube-small.webp";
import paperBag from "../assets/brands/marinaro-paper-bag.webp";
import paperBagSmall from "../assets/brands/marinaro-paper-bag-small.webp";
import pouch from "../assets/brands/marinaro-pouch.webp";
import pouchSmall from "../assets/brands/marinaro-pouch-small.webp";
import cup from "../assets/brands/marinaro-cup.webp";
import cupSmall from "../assets/brands/marinaro-cup-small.webp";
import can from "../assets/brands/marinaro-can.webp";
import canSmall from "../assets/brands/marinaro-can-small.webp";
import tote from "../assets/brands/marinaro-tote.webp";
import toteSmall from "../assets/brands/marinaro-tote-small.webp";
import hoodie from "../assets/brands/marinaro-hoodie.webp";
import hoodieSmall from "../assets/brands/marinaro-hoodie-small.webp";
import "./BrandIdentity.css";
import {useTranslation} from "../i18n/context.js";


const mockups = [
  { id: "hoodie", name: "Hoodie", src: hoodie, small: hoodieSmall, width: 1120, height: 1400,
    alt: "Retro di una felpa Marinaro avorio, con grande logo nero e pattern lime e lilla." },
  { id: "tube", name: "Packaging cilindrico", src: tube, small: tubeSmall, width: 1024, height: 1536,
    alt: "Packaging cilindrico Marinaro, avorio con forme lime e lilla." },
  { id: "paper-bag", name: "Packaging in carta", src: paperBag, small: paperBagSmall, width: 1120, height: 1400,
    alt: "Confezione in carta kraft Marinaro con etichetta lime e dettagli lilla." },
  { id: "pouch", name: "Pouch", src: pouch, small: pouchSmall, width: 1120, height: 1400,
    alt: "Busta richiudibile Marinaro con pattern lime e lilla." },
  { id: "cup", name: "Coffee cup", src: cup, small: cupSmall, width: 1120, height: 1400,
    alt: "Bicchiere da asporto verde scuro, logo Marinaro avorio e dettagli lilla." },
  { id: "can", name: "Lattina", src: can, small: canSmall, width: 1024, height: 1536,
    alt: "Lattina nera Marinaro con grafica lime, lilla e logo bianco." },
  { id: "tote", name: "Tote bag", src: tote, small: toteSmall, width: 1120, height: 840,
    alt: "Tote bag in tela avorio con logo Marinaro e forme lime e lilla." },
];
// A single decorative duplicate makes the last-to-first transition one slide
// wide. It is hidden on desktop and excluded from focus and assistive output.
const galleryItems = [...mockups, { ...mockups[0], loop: true }];
const centeredOffset = (rail, item) => item.offsetLeft - (rail.clientWidth - item.offsetWidth) / 2;

export default function BrandIdentity() {
  const {t:tr}=useTranslation();

  const rootRef = useRef(null);
  const railRef = useRef(null);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const openerRef = useRef(null);
  const scrollFrame = useRef(0);
  const activeRef = useRef(0);
  const autoplayRef = useRef(null);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(null);
  const [interacting, setInteracting] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const isOpen = selected !== null;
  const current = isOpen ? mockups[selected] : null;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    let inView = false;
    const sync = () => { root.dataset.moving = String(inView && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    }, { threshold: .12 });
    observer.observe(root);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      cancelAnimationFrame(scrollFrame.current);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const dialog = dialogRef.current;
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    if (!dialog.open) dialog.showModal();
    html.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      if (dialog.open) dialog.close();
      html.style.overflow = previousOverflow;
      if (openerRef.current?.isConnected) openerRef.current.focus({ preventScroll: true });
    };
  }, [isOpen]);

  const syncSlide = () => {
    cancelAnimationFrame(scrollFrame.current);
    scrollFrame.current = requestAnimationFrame(() => {
      const rail = railRef.current;
      if (!rail || getComputedStyle(rail).display === "contents") return;
      const middle = rail.scrollLeft + rail.clientWidth / 2;
      let nearest = 0;
      let distance = Infinity;
      Array.from(rail.children).forEach((item, index) => {
        const delta = Math.abs(item.offsetLeft + item.offsetWidth / 2 - middle);
        if (delta < distance) { nearest = index; distance = delta; }
      });
      const next = nearest % mockups.length;
      activeRef.current = next;
      setActive(next);
      const clone = rail.children[mockups.length];
      if (nearest === mockups.length && Math.abs(rail.scrollLeft - centeredOffset(rail, clone)) < 1) {
        rail.scrollTo({ left: centeredOffset(rail, rail.children[0]), behavior: "instant" });
      }
    });
  };

  const goToSlide = useCallback((index, focus = false) => {
    const rail = railRef.current;
    if (!rail || getComputedStyle(rail).display === "contents") return;
    const next = (index + mockups.length) % mockups.length;
    const item = rail.children[index === mockups.length && !focus ? mockups.length : next];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollTo({ left: centeredOffset(rail, item),
      behavior: reduced || index < 0 || (focus && index === mockups.length) ? "instant" : "smooth" });
    activeRef.current = next;
    setActive(next);
    if (focus) item.querySelector("button")?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    const controller = observeBrandAutoplay(rail, {
      prepare: () => { rail.querySelectorAll("img").forEach((img) => { img.loading = "eager"; }); },
      advance: () => {
        const next = activeRef.current + 1;
        const image = rail.children[next]?.querySelector("img");
        // Do not animate into a blank image on a slow connection.
        if (image?.complete && image.naturalWidth) goToSlide(next);
      },
    });
    autoplayRef.current = controller;
    return () => { controller.destroy(); autoplayRef.current = null; };
  }, [goToSlide]);

  useEffect(() => {
    autoplayRef.current?.setPaused(isOpen || interacting || keyboardFocus);
  }, [isOpen, interacting, keyboardFocus]);

  useEffect(() => {
    const release = () => setInteracting(false);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    return () => {
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
    };
  }, []);

  const openMockup = (index, event) => {
    openerRef.current = event.currentTarget;
    setSelected(index);
  };
  const moveViewer = (direction) => setSelected((index) =>
    index === null ? null : (index + direction + mockups.length) % mockups.length);

  return (
    <section ref={rootRef} id="identity" className="identity-showcase"
      aria-labelledby="identity-title" data-layout="editorial-mockups-v21" data-viewing={isOpen}
      onPointerDown={() => { setInteracting(true); setKeyboardFocus(false); }}
      onFocusCapture={(event) => { if (event.target.matches(":focus-visible")) setKeyboardFocus(true); }}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setKeyboardFocus(false); }}>
      <div className="identity-showcase__composition">
        <header className="identity-showcase__header">
          <EditorialTitle id="identity-title"><TechText text="BRANDS" autoPlay /></EditorialTitle>
        </header>

        <ul ref={railRef} id="brands-gallery" className="identity-showcase__gallery"
          aria-label={tr("Applicazioni dell’identità Marinaro")} aria-live="off" onScroll={syncSlide}
          onKeyDown={(event) => {
            if (getComputedStyle(event.currentTarget).display === "contents") return;
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              const index = Array.from(event.currentTarget.children).findIndex((item) => item.contains(event.target));
              goToSlide((index < 0 ? active : index) + (event.key === "ArrowRight" ? 1 : -1), true);
            }
          }}>
          {galleryItems.map((mockup, index) => (
            <li key={mockup.loop ? "loop" : mockup.id} aria-hidden={mockup.loop || undefined} inert={mockup.loop || undefined}
              className={`identity-showcase__item identity-showcase__item--${mockup.id}${mockup.loop ? " identity-showcase__item--loop" : ""}`}>
              <button type="button" className="identity-showcase__object"
                aria-label={tr(`Apri ${mockup.name.toLowerCase()}`)}
                aria-haspopup="dialog" onClick={(event) => openMockup(index, event)}>
                <span className="identity-showcase__float">
                  <img src={mockup.src} srcSet={`${mockup.small} 480w, ${mockup.src} ${mockup.width}w`}
                    sizes="(max-width: 900px) 76vw, 38vw" width={mockup.width} height={mockup.height}
                    alt={tr(mockup.alt)} loading="lazy" decoding="async" draggable="false" />
                </span>
              </button>
            </li>
          ))}
        </ul>

        <p className="identity-showcase__transparency">{tr("Mockup dimostrativi con visual generati con AI.")}</p>
        <div className="identity-showcase__navigation" aria-label={tr("Navigazione mockup")}>
          <div className="identity-showcase__arrows">
            <button type="button" className="identity-showcase__arrow" aria-label={tr("Mockup precedente")}
              aria-controls="brands-gallery" onClick={() => goToSlide(active - 1)}>
              <ChevronLeft size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button type="button" className="identity-showcase__arrow" aria-label={tr("Mockup successivo")}
              aria-controls="brands-gallery" onClick={() => goToSlide(active + 1)}>
              <ChevronRight size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <dialog ref={dialogRef} className="brand-viewer" aria-label={tr("Mockup Marinaro ingranditi")} data-lenis-prevent
        onCancel={(event) => { event.preventDefault(); setSelected(null); }}
        onClose={() => { if (!dialogRef.current?.open) setSelected(null); }}
        onClick={(event) => { if (event.target === event.currentTarget) setSelected(null); }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            moveViewer(event.key === "ArrowRight" ? 1 : -1);
          }
        }}>
        {current && <>
          <div className="brand-viewer__top">
            <span className="brand-viewer__signature"><MarinaroWordmark className="brand-viewer__wordmark"/><span className="brand-viewer__muted">{tr("/ BRANDS")}</span></span>
            <button ref={closeRef} type="button" className="brand-viewer__button" aria-label={tr("Chiudi anteprima")}
              onClick={() => setSelected(null)}><X size={23} strokeWidth={1.5} aria-hidden="true" /></button>
          </div>
          <figure className="brand-viewer__figure" onClick={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}>
            <img key={current.id} src={current.src} alt={tr(current.alt)} width={current.width}
              height={current.height} decoding="async" draggable="false" />
            <figcaption aria-live="polite">{tr(current.name)} · {tr("Visual generato con AI")}</figcaption>
          </figure>
          <div className="brand-viewer__navigation">
            <button type="button" className="brand-viewer__button" aria-label={tr("Mockup precedente")}
              onClick={() => moveViewer(-1)}><ChevronLeft size={23} strokeWidth={1.5} aria-hidden="true" /></button>
            <button type="button" className="brand-viewer__button" aria-label={tr("Mockup successivo")}
              onClick={() => moveViewer(1)}><ChevronRight size={23} strokeWidth={1.5} aria-hidden="true" /></button>
          </div>
        </>}
      </dialog>
    </section>
  );
}
