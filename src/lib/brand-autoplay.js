// One clock for the mobile gallery. Visibility, input and media preferences
// gate the clock so it never catches up with a burst of delayed transitions.
export function observeBrandAutoplay(element, { advance, prepare }, environment = globalThis) {
  const mobile = environment.matchMedia("(max-width: 900px)");
  const reduced = environment.matchMedia("(prefers-reduced-motion: reduce)");
  const { document } = environment;
  let visible = false;
  let paused = false;
  let timer = null;
  let disposed = false;

  const stop = () => {
    if (timer !== null) environment.clearInterval(timer);
    timer = null;
  };
  const sync = () => {
    stop();
    if (disposed || !visible || document.hidden || !mobile.matches) return;
    prepare?.();
    if (!paused && !reduced.matches) timer = environment.setInterval(advance, 1500);
  };
  const observer = new environment.IntersectionObserver(([entry]) => {
    const next = entry.isIntersecting && entry.intersectionRatio >= .45;
    if (next === visible) return;
    visible = next;
    sync();
  }, { threshold: [0, .45] });
  observer.observe(element);
  mobile.addEventListener("change", sync);
  reduced.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);

  return {
    setPaused(value) {
      if (paused === Boolean(value)) return;
      paused = Boolean(value);
      sync();
    },
    destroy() {
      disposed = true;
      stop();
      observer.disconnect();
      mobile.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    },
  };
}
