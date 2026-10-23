import { useEffect, useRef } from "react";
import { drawVeilAurora } from "../../lib/draw-veil-aurora";
import "./AuroraBackdrop.css";

const DEFAULT_PALETTE = ["133, 217, 145", "203, 190, 229", "116, 73, 248"];

// Original canvas aurora: three soft curtains, no shader or extra dependency.
// The small drawing surface and 30 fps cap keep the glass effect inexpensive.
export default function AuroraBackdrop() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const surface = canvas?.parentElement;
    const scene = surface?.parentElement;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!context || !scene) return undefined;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 640px)");
    let frame = 0;
    let previousTime = 0;
    let elapsed = 0;
    let visible = false;
    let width = 0;
    let height = 0;
    let palette = DEFAULT_PALETTE;

    function draw() {
      if (!width || !height) return;
      const t = elapsed * .00046;
      context.clearRect(0, 0, width, height);
      if (compact.matches) {
        drawVeilAurora(context, width, height, elapsed);
        return;
      }
      context.globalCompositeOperation = "lighter";

      const curtains = [
        { center: .17 + Math.sin(t) * .17, reach: .76 + Math.sin(t * .8) * .12, spread: .36, rgb: palette[0], phase: 0 },
        { center: .48 + Math.sin(t * .72 + 2) * .14, reach: .65 + Math.cos(t) * .13, spread: .28, rgb: palette[1], phase: 1.9 },
        { center: .82 + Math.sin(t * .85 + 4) * .16, reach: .85 + Math.sin(t * .9 + 2) * .11, spread: .37, rgb: palette[2], phase: 4.1 },
      ];

      for (const curtain of curtains) {
        // Adjacent translucent strips form a continuous, gently rippling edge.
        const strip = width / 64;
        for (let i = 0; i < 64; i += 1) {
          const x = (i + .5) / 64;
          const distance = (x - curtain.center) / curtain.spread;
          const strength = Math.exp(-distance * distance * 3.2);
          if (strength < .012) continue;
          const ripple = Math.sin(x * 8 + t * 1.15 + curtain.phase) * .12
            + Math.sin(x * 17 - t * .7 + curtain.phase) * .045;
          const bottom = height * (curtain.reach + ripple);
          const glow = context.createLinearGradient(0, -height * .08, 0, bottom);
          glow.addColorStop(0, `rgba(${curtain.rgb}, ${strength * .74})`);
          glow.addColorStop(.24, `rgba(${curtain.rgb}, ${strength * .54})`);
          glow.addColorStop(.55, `rgba(${curtain.rgb}, ${strength * .24})`);
          glow.addColorStop(1, `rgba(${curtain.rgb}, 0)`);
          context.fillStyle = glow;
          context.fillRect(i * strip, 0, strip + .5, bottom);
        }
      }
      context.globalCompositeOperation = "source-over";
    }

    function resize() {
      const rect = surface.getBoundingClientRect();
      // Read the responsive colors only on resize, never in the animation loop.
      const styles = window.getComputedStyle(surface);
      palette = ["--aurora-left", "--aurora-center", "--aurora-right"].map((name, index) =>
        styles.getPropertyValue(name).trim() || DEFAULT_PALETTE[index]);
      // A blurred decorative background needs no device-pixel-ratio multiplier.
      const scale = Math.min(1, (compact.matches ? 480 : 960) / Math.max(1, rect.width));
      width = Math.max(1, Math.round(rect.width * scale));
      height = Math.max(1, Math.round(rect.height * scale));
      canvas.width = width;
      canvas.height = height;
      draw();
    }

    function animate(time) {
      if (!previousTime) previousTime = time;
      if (time - previousTime >= 1000 / 30) {
        elapsed += Math.min(time - previousTime, 80);
        previousTime = time;
        draw();
      }
      frame = window.requestAnimationFrame(animate);
    }

    function sync() {
      window.cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      if (visible && !document.hidden && !preference.matches) {
        frame = window.requestAnimationFrame(animate);
      } else {
        draw();
      }
    }

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    resizeObserver.observe(surface);
    intersectionObserver.observe(scene);
    document.addEventListener("visibilitychange", sync);
    preference.addEventListener("change", sync);
    compact.addEventListener("change", resize);
    resize();
    surface.dataset.ready = "true";

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      preference.removeEventListener("change", sync);
      compact.removeEventListener("change", resize);
      delete surface.dataset.ready;
    };
  }, []);

  return <div className="form-aurora" aria-hidden="true"><canvas ref={canvasRef} /></div>;
}
