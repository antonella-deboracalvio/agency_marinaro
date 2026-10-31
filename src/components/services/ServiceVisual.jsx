import { useEffect, useId, useRef, useState } from "react";
import {useTranslation} from "../../i18n/context.js";


export default function ServiceVisual({ visual, className = "", eager = false }) {
  const {t:tr}=useTranslation();

  const [expanded, setExpanded] = useState(false);
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (!expanded) return;
    const dialog = dialogRef.current;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      if (dialog.open) dialog.close();
    };
  }, [expanded]);

  return <figure className={`service-visual ${className}`.trim()} data-brand={visual.brand} style={{ "--visual-color": visual.color, "--visual-background": visual.background, "--visual-position": visual.position || "50% 50%", "--visual-fit": visual.fit || "cover" }}>
    <button type="button" className="service-visual__surface" aria-label={tr(`Apre immagine: ${visual.label}`)} aria-haspopup="dialog" onClick={() => setExpanded(true)} disabled={!visual.src}>
      {visual.src && <img src={visual.src} srcSet={visual.srcSet} sizes="(max-width: 767px) 90vw, (max-width: 1000px) 48vw, 640px" width={visual.width || 1254} height={visual.height || 1254} alt={tr(visual.alt || visual.label)} loading={eager ? "eager" : "lazy"} decoding="async" />}
      {visual.src && <span className="service-visual__expand" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M7 7h10v10" stroke="currentColor" strokeWidth="1.5" /></svg></span>}
    </button>
    <figcaption><span>{tr(visual.label)}</span>{visual.brand && <span className="service-visual__brand">{tr(visual.brand)}</span>}{visual.generated && <small className="service-visual__disclosure">{tr("Esempio dimostrativo · immagine generata con AI")}</small>}</figcaption>
    <dialog ref={dialogRef} className="service-art-viewer" aria-labelledby={titleId} data-lenis-prevent onClose={() => setExpanded(false)} onClick={event => { if (event.target === event.currentTarget) setExpanded(false); }}>
      <div className="service-art-viewer__frame">
        <div className="service-art-viewer__top"><p id={titleId}>{tr(visual.label)}<span>{tr(visual.brand)}</span>{visual.generated && <small className="service-visual__disclosure">{tr("Esempio dimostrativo · immagine generata con AI")}</small>}</p><button type="button" onClick={() => setExpanded(false)} aria-label={tr("Chiudi immagine")} autoFocus><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" /></svg></button></div>
        {expanded && <img src={visual.src} alt={tr(visual.alt || visual.label)} width={visual.width || 1254} height={visual.height || 1254} />}
      </div>
    </dialog>
  </figure>;
}
