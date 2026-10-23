import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ServiceVisual from "./ServiceVisual";

export default function ServiceGallery({ visuals, name }) {
  const trackRef = useRef(null);
  const id = useId();
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const track = trackRef.current;
    let frame;
    const measure = () => {
      const start = track.scrollLeft <= 2;
      const end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
      setEdges(current => current.start === start && current.end === end ? current : { start, end });
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); track.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, []);

  const move = (direction) => {
    const track = trackRef.current;
    const card = track.firstElementChild;
    if (!card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return <section className="service-gallery" aria-label={`Formati e applicazioni ${name}`} aria-roledescription="carosello">
    <div id={id} className="service-gallery__track" ref={trackRef} data-lenis-prevent tabIndex={0} aria-label="Scorri le immagini con le frecce o con un gesto"
      onKeyDown={event => {
        if (event.target !== event.currentTarget || event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
      }}>
      {visuals.map((visual, index) => <ServiceVisual key={visual.src} visual={visual} eager={index === 0} />)}
    </div>
    <div className="service-gallery__toolbar service-area__wrap">
      <div className="service-gallery__controls">
        <button type="button" aria-label="Immagine precedente" aria-controls={id} disabled={edges.start} onClick={() => move(-1)}><ArrowLeft size={18} aria-hidden="true" /><span>Precedente</span></button>
        <button type="button" aria-label="Immagine successiva" aria-controls={id} disabled={edges.end} onClick={() => move(1)}><span>Successiva</span><ArrowRight size={18} aria-hidden="true" /></button>
      </div>
    </div>
  </section>;
}
