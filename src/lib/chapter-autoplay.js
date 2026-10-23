// The clock starts on entry, never on mount, hover or a playback button.
// Kept outside React so render/animation completion cannot delay the cadence.
export function observeChapterAutoplay(element, { onEnter, onAdvance, interval = 1500 }, environment = globalThis) {
  const { document } = environment;
  const delay = Number.isFinite(interval) ? Math.max(500, interval) : 1500;
  let visible = false;
  let timer = null;

  function stop() {
    if (timer !== null) environment.clearInterval(timer);
    timer = null;
  }

  function sync() {
    stop();
    if (visible && !document.hidden) timer = environment.setInterval(onAdvance, delay);
  }

  const observer = new environment.IntersectionObserver(([entry]) => {
    const nextVisible = entry.isIntersecting;
    if (nextVisible === visible) return;
    visible = nextVisible;
    if (visible && !document.hidden) onEnter();
    sync();
  }, { threshold: 0 });

  observer.observe(element);
  document.addEventListener("visibilitychange", sync);

  return () => {
    stop();
    observer.disconnect();
    document.removeEventListener("visibilitychange", sync);
  };
}
