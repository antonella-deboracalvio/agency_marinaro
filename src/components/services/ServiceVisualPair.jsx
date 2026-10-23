import { useEffect, useId, useRef, useState } from "react";
import ServiceVisual from "./ServiceVisual";

export default function ServiceVisualPair({ section }) {
  const [direction, setDirection] = useState("contemporary");
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);
  const id = useId();
  const visuals = direction === "contemporary" ? section.contemporaryVisuals : section.visuals;

  useEffect(() => {
    trackRef.current.scrollLeft = 0;
    setActive(0);
  }, [direction]);

  const move = index => {
    const track = trackRef.current;
    const card = track.children[index];
    if (!card) return;
    const left = card.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
    track.scrollTo({ left, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return <div className="service-detail__art" data-direction={direction}>
    <div className="service-art-directions" role="group" aria-label={`Stile degli esempi: ${section.label}`}>
      <button type="button" aria-pressed={direction === "contemporary"} aria-controls={id} onClick={() => setDirection("contemporary")}>Pop & grafico</button>
      <button type="button" aria-pressed={direction === "essential"} aria-controls={id} onClick={() => setDirection("essential")}>Essenziale & materico</button>
    </div>
    <div id={id} ref={trackRef} className="service-detail__visuals" tabIndex={0} role="region" aria-label={`Immagini: ${section.label}`}
      onScroll={() => {
        const track = trackRef.current;
        const step = track.firstElementChild.getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 0);
        setActive(Math.min(visuals.length - 1, Math.max(0, Math.round(track.scrollLeft / step))));
      }}
      onKeyDown={event => {
        if (event.target !== event.currentTarget || event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          move(Math.min(visuals.length - 1, Math.max(0, active + (event.key === "ArrowRight" ? 1 : -1))));
        }
      }}>
      {visuals.map(visual => <ServiceVisual key={visual.src} visual={visual} />)}
    </div>
    <div className="service-art-pagination" role="group" aria-label="Scegli immagine">
      {visuals.map((visual, index) => <button key={visual.src} type="button" aria-label={`Mostra ${visual.label}`} aria-pressed={active === index} aria-controls={id} onClick={() => move(index)}><span /></button>)}
    </div>
  </div>;
}
