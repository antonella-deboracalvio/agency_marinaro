import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./TechText.css";

// A lightweight, SVG-based interpretation of React Bits' Tech Text.
// The original heading font is measured, not replaced or stretched.
export default function TechText({ text, className = "", autoPlay = true }) {
  const rootRef = useRef(null);
  const [layout, setLayout] = useState(null);
  const [active, setActive] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const context = document.createElement("canvas").getContext("2d");
    if (!context) return undefined;
    let alive = true;
    let lastWidth = -1;

    const measure = () => {
      if (!alive || root.clientWidth < 1) return;
      const width = root.clientWidth;
      const style = getComputedStyle(root);
      const desiredSize = parseFloat(style.fontSize);
      const tracking = parseFloat(style.letterSpacing) || 0;
      const letters = Array.from(text);
      const font = (size) => `${style.fontWeight} ${size}px ${style.fontFamily}`;
      context.font = font(desiredSize);
      const naturalWidth = letters.reduce((sum, char) => sum + context.measureText(char).width, 0)
        + tracking * Math.max(0, letters.length - 1);
      const scale = Math.min(1, Math.max(0, width - 20) / Math.max(1, naturalWidth));
      const fontSize = desiredSize * scale;
      const letterSpacing = tracking * scale;
      context.font = font(fontSize);
      const metrics = letters.map((char) => context.measureText(char));
      const ascent = Math.max(fontSize * .65, ...metrics.map((m) => m.actualBoundingBoxAscent || 0));
      const descent = Math.max(0, ...metrics.map((m) => m.actualBoundingBoxDescent || 0));
      const wordWidth = metrics.reduce((sum, metric) => sum + metric.width, 0)
        + letterSpacing * Math.max(0, letters.length - 1);
      const baseline = ascent + 25;
      let pen = (width - wordWidth) / 2;
      const glyphs = letters.map((char, index) => {
        const metric = metrics[index];
        const left = metric.actualBoundingBoxLeft || 0;
        const right = metric.actualBoundingBoxRight || metric.width;
        const glyphAscent = metric.actualBoundingBoxAscent || ascent;
        const glyphDescent = Math.max(0, metric.actualBoundingBoxDescent || 0);
        const glyph = {
          char, x: pen, width: metric.width,
          box: { x: pen - left - 3, y: baseline - glyphAscent - 3,
            width: left + right + 6, height: glyphAscent + glyphDescent + 6 },
        };
        pen += metric.width + letterSpacing;
        return glyph;
      });
      lastWidth = width;
      setLayout({ width, height: baseline + descent + 18, baseline, fontSize, glyphs });
    };

    measure();
    const observer = new ResizeObserver(() => {
      if (Math.abs(root.clientWidth - lastWidth) > .5) measure();
    });
    observer.observe(root);
    window.addEventListener("resize", measure, { passive: true });
    document.fonts?.ready.then(measure);
    document.fonts?.addEventListener("loadingdone", measure);
    return () => {
      alive = false;
      observer.disconnect();
      window.removeEventListener("resize", measure);
      document.fonts?.removeEventListener("loadingdone", measure);
    };
  }, [text]);

  useEffect(() => {
    const root = rootRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreferences = () => { setReduced(motion.matches); setActive(-1); };
    const syncVisibility = () => setPageVisible(!document.hidden);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .25 });
    if (root) observer.observe(root);
    syncPreferences();
    syncVisibility();
    motion.addEventListener("change", syncPreferences);
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", syncPreferences);
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  useEffect(() => {
    if (!autoPlay || reduced || !visible || !pageVisible || !text.length) {
      setActive(-1);
      return undefined;
    }
    // The same automatic sweep on desktop and touch, only while visible.
    let index = 0;
    setActive(index);
    const timer = window.setInterval(() => {
      index = (index + 1) % (Array.from(text).length + 1);
      setActive(index === Array.from(text).length ? -1 : index);
    }, 850);
    return () => window.clearInterval(timer);
  }, [autoPlay, reduced, visible, pageVisible, text]);

  const followPointer = (event) => {
    if (!layout?.glyphs.length || autoPlay || reduced) return;
    const x = event.clientX - event.currentTarget.getBoundingClientRect().left;
    let nearest = 0;
    layout.glyphs.forEach((glyph, index) => {
      if (Math.abs(x - glyph.x - glyph.width / 2) < Math.abs(x - layout.glyphs[nearest].x - layout.glyphs[nearest].width / 2)) nearest = index;
    });
    setActive(nearest);
  };
  const selected = layout?.glyphs[active];
  const box = selected?.box;
  const labelAtEnd = box && box.x + 100 > layout.width;

  return (
    <span ref={rootRef} className={`tech-text ${className}`.trim()}
      data-automatic={autoPlay && !reduced} onPointerMove={followPointer}
      onPointerLeave={() => { if (!autoPlay) setActive(-1); }}>
      <span className="tech-text__accessible">{text}</span>
      {!layout ? <span className="tech-text__fallback" aria-hidden="true">{text}</span> : (
        <svg className="tech-text__svg" width={layout.width} height={layout.height}
          viewBox={`0 0 ${layout.width} ${layout.height}`} aria-hidden="true" focusable="false">
          {layout.glyphs.map((glyph, index) => (
            <g key={`${index}-${glyph.char}`} className="tech-text__glyph" data-active={active === index}>
              <text x={glyph.x} y={layout.baseline} fontSize={layout.fontSize} className="tech-text__fill">{glyph.char}</text>
              <text x={glyph.x} y={layout.baseline} fontSize={layout.fontSize} className="tech-text__outline">{glyph.char}</text>
            </g>
          ))}
          {box && <g className="tech-text__selection" transform={`translate(${box.x} ${box.y})`}>
            <rect className="tech-text__frame" width={box.width} height={box.height} />
            {[[0, 0], [box.width, 0], [0, box.height], [box.width, box.height]].map(([x, y], index) => (
              <rect className="tech-text__handle" key={index} x={x - 2} y={y - 2} width="4" height="4" />
            ))}
            <text className="tech-text__label" x={labelAtEnd ? box.width : 0} y="-9" textAnchor={labelAtEnd ? "end" : "start"}>
              {selected.char} · {Math.round(box.width - 6)} × {Math.round(box.height - 6)}
            </text>
            <rect className="tech-text__speck" x={box.width * .25} y={box.height + 7} width="3" height="3" />
            <rect className="tech-text__speck tech-text__speck--second" x={box.width * .65} y={box.height + 10} width="2" height="2" />
          </g>}
        </svg>
      )}
    </span>
  );
}
