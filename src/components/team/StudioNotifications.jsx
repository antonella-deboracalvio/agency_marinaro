import { useEffect, useRef, useState } from "react";
import {useTranslation} from "../../i18n/context.js";


const phases = [
  { label: "Idea", text: "Ascoltiamo ciò che vuoi costruire." },
  { label: "Design", text: "Diamo una forma chiara alla tua idea." },
  { label: "Codice", text: "Trasformiamo il design in un prodotto." },
  { label: "Online", text: "Testiamo, rifiniamo e pubblichiamo." },
];

export default function StudioNotifications() {
  const {t:tr}=useTranslation();

  const root = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let timer;
    const stop = () => window.clearInterval(timer);
    const sync = () => {
      stop();
      if (reduced.matches) { setActive(0); return; }
      if (!visible || document.hidden) return;
      timer = window.setInterval(() => setActive(index => (index + 1) % phases.length), 2800);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .25 });
    observer.observe(root.current);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      stop();
      observer.disconnect();
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <article className="studio-bento__messages" ref={root} aria-label={tr("Dall’idea al sito online")}>
      <p className="studio-notifications__label">{tr("Le idee si muovono.")}</p>
      <ol className="studio-flow" aria-label={tr("Le fasi: idea, design, codice, online")}>
        {phases.map((phase, index) => <li key={phase.label} data-active={index === active} data-complete={index <= active}>
          <span>{tr(phase.label)}</span><i aria-hidden="true" />
        </li>)}
      </ol>
      <p key={active} className="studio-flow__caption" aria-live="off">{tr(phases[active].text)}</p>
    </article>
  );
}
