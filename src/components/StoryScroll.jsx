import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./StoryScroll.css";

gsap.registerPlugin(ScrollTrigger);

export default function StoryScroll() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    let alive = true;
    const media = gsap.matchMedia();

    media.add({
      desktop: "(min-width: 1024px)",
      mobile: "(max-width: 1023px)",
      reduced: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      const { desktop, reduced } = context.conditions;

      if (desktop) {
        const scene = section.querySelector(".story-cross");
        const stage = scene.querySelector(".story-cross__stage");
        const composition = scene.querySelector(".story-cross__title");
        const creative = scene.querySelector(".story-cross__creative");
        const agency = scene.querySelector(".story-cross__agency");
        const intro = scene.querySelector(".story-cross__intro");
        const note = scene.querySelector(".story-cross__note");

        const fitWords = () => {
          composition.style.removeProperty("font-size");
          const size = parseFloat(getComputedStyle(composition).fontSize);
          const available = stage.clientWidth * .9;
          const widest = Math.max(creative.offsetWidth, agency.offsetWidth);
          if (widest > available) composition.style.fontSize = size * available / widest + "px";
        };
        fitWords();

        if (reduced) {
          const observer = new ResizeObserver(fitWords);
          observer.observe(stage);
          document.fonts?.ready.then(() => { if (alive) fitWords(); });
          return () => { observer.disconnect(); composition.style.removeProperty("font-size"); };
        }

        // Adjacent baselines cross the centre in opposite directions, never
        // overlap. Both words fit fully at the final composition, on any font.
        gsap.timeline({
          scrollTrigger: {
            trigger: scene,
            start: () => `top ${parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--site-header-height"))}px`,
            end: "bottom bottom",
            scrub: .65,
            invalidateOnRefresh: true,
            onRefreshInit: fitWords,
          },
        })
          .fromTo(creative, { x: () => -stage.clientWidth * .44 },
            { x: () => stage.clientWidth * .016, duration: .72, ease: "none" }, 0)
          .fromTo(agency, { x: () => stage.clientWidth * .44 },
            { x: () => -stage.clientWidth * .016, duration: .72, ease: "none" }, 0)
          .to([creative, agency], { x: 0, duration: .16, ease: "power1.out" }, .72)
          .to(intro, { autoAlpha: 0, y: -18, duration: .2, ease: "none" }, .22)
          .fromTo(note, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: .14, ease: "none" }, .73)
          .to({}, { duration: .12 }, .88);

        return () => composition.style.removeProperty("font-size");
      }

      // Fit the longer copy before animating, including after fonts/viewport changes.
      const scene = section.querySelector(".story-mobile");
      const words = [...scene.querySelectorAll(".story-scroll__word")];
      const fitMobileWords = () => words.forEach((word) => {
        word.style.removeProperty("font-size");
        const size = parseFloat(getComputedStyle(word).fontSize);
        const width = word.firstElementChild.offsetWidth;
        const available = scene.clientWidth * .88;
        if (width > available) word.style.fontSize = `${size * available / width}px`;
      });
      fitMobileWords();
      if (reduced) {
        const observer = new ResizeObserver(fitMobileWords);
        observer.observe(scene);
        document.fonts?.ready.then(() => { if (alive) fitMobileWords(); });
        return () => { observer.disconnect(); words.forEach((word) => word.style.removeProperty("font-size")); };
      }
      gsap.timeline({
        scrollTrigger: { trigger: scene, start: () => `top ${parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--site-header-height"))}px`, end: "bottom bottom", scrub: 1.4, invalidateOnRefresh: true, onRefreshInit: fitMobileWords },
      })
        .fromTo(scene.querySelector(".story-scroll__creative--large"), { xPercent: -3 }, { xPercent: 3, ease: "none" }, 0)
        .to(scene.querySelector(".story-scroll__intro"), { yPercent: -80, opacity: 0, ease: "none" }, 0)
        .fromTo(scene.querySelector(".story-scroll__panel--agency"), { yPercent: 100 }, { yPercent: 0, ease: "none" }, .44)
        .fromTo(scene.querySelector(".story-scroll__agency--large"), { xPercent: -3 }, { xPercent: 3, ease: "none" }, .44)
        .fromTo(scene.querySelector(".story-scroll__agency-note"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, ease: "none" }, .62);
      return () => words.forEach((word) => word.style.removeProperty("font-size"));
    }, section);

    document.fonts?.ready.then(() => { if (alive) ScrollTrigger.refresh(); });
    ScrollTrigger.refresh();
    return () => { alive = false; media.revert(); };
  }, []);

  return (
    <section ref={sectionRef} className="story-scroll" aria-label="Different by design">
      <div className="story-cross">
        <div className="story-cross__stage">
          <p className="story-cross__intro">WE THINK. WE CREATE.</p>
          <h2 className="story-cross__title" aria-label="DIFFERENT BY DESIGN.">
            <span className="story-cross__word story-cross__creative" aria-hidden="true">DIFFERENT</span>
            <span className="story-cross__word story-cross__agency" aria-hidden="true">BY DESIGN.</span>
          </h2>
          <p className="story-cross__note">Design, tecnologia e strategia.</p>
        </div>
      </div>

      <div className="story-mobile">
        <div className="story-scroll__stage">
          <article className="story-scroll__panel story-scroll__panel--creative">
            <p className="story-scroll__intro">WE THINK.<br />WE CREATE.</p>
            <div className="story-scroll__word story-scroll__creative--large"><span>DIFFERENT</span></div>
          </article>
          <article className="story-scroll__panel story-scroll__panel--agency">
            <div className="story-scroll__word story-scroll__agency--large"><span>BY DESIGN.</span></div>
            <p className="story-scroll__agency-note">Design, tecnologia e strategia.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
