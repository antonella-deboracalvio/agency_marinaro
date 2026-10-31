"use client";

import { memo, useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { observeChapterAutoplay } from "../../lib/chapter-autoplay";
import "./chapter-scrubber.css";
import {useTranslation} from "../../i18n/context.js";


const TICKS_PER_CHAPTER = 6;
const ROW_HEIGHT = 9;
const SPRING = { stiffness: 210, damping: 30, mass: .65 };
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const centerOf = (index) => (index + .5) * TICKS_PER_CHAPTER - .5;

function riseAt(index, pointer) {
  const distance = Math.abs(index - pointer);
  return distance >= 4.5 ? 0 : .5 * (1 + Math.cos(Math.PI * distance / 4.5));
}

const Tick = memo(function Tick({ index, pointer, current }) {
  // Only transforms and opacity change per frame; React never rerenders per tick.
  const scaleX = useTransform(pointer, (value) => .23 + .77 * riseAt(index, value));
  const scaleY = useTransform(pointer, (value) => 1 + .35 * riseAt(index, value));
  const opacity = useTransform(pointer, (value) => .24 + .76 * riseAt(index, value));
  return (
    <span className="chapter-scrubber__tick-slot" aria-hidden="true">
      <motion.span className="chapter-scrubber__tick" data-current={current || undefined} style={{ scaleX, scaleY, opacity }} />
    </span>
  );
});

// Adapted from the supplied Chapter Scrubber. Existing React + Framer Motion
// are sufficient. The automatic sequence runs only while visible.
export function ChapterScrubber({ chapters = [], label = "Le fasi del progetto", autoPlay = true, interval = 1500 }) {
  const {t:tr}=useTranslation();

  const rootRef = useRef(null);
  const cardRef = useRef(null);
  const tabsRef = useRef([]);
  const baseId = useId();
  const reduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const [cardHeight, setCardHeight] = useState(144);
  const rawPointer = useMotionValue(centerOf(0));
  const springPointer = useSpring(rawPointer, SPRING);
  const pointer = reduced ? rawPointer : springPointer;
  const totalHeight = chapters.length * TICKS_PER_CHAPTER * ROW_HEIGHT;
  const previewY = useTransform(pointer, (value) => clamp((value + .5) * ROW_HEIGHT - cardHeight / 2, 0, Math.max(0, totalHeight - cardHeight)));

  const activate = useCallback((index, pointerRow = centerOf(index)) => {
    const next = clamp(index, 0, Math.max(0, chapters.length - 1));
    activeIndexRef.current = next;
    rawPointer.set(pointerRow);
    setActiveIndex(next);
  }, [chapters.length, rawPointer]);

  useEffect(() => {
    const element = rootRef.current;
    if (!element || !autoPlay || reduced || chapters.length < 2) return undefined;
    return observeChapterAutoplay(element, {
      interval,
      onEnter: () => activate(0),
      onAdvance: () => activate((activeIndexRef.current + 1) % chapters.length),
    });
  }, [autoPlay, reduced, chapters.length, interval, activate]);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return undefined;
    const measure = () => setCardHeight(element.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeIndex >= chapters.length && chapters.length) activate(0);
  }, [chapters.length, activeIndex, activate]);

  const handleKeyDown = (event) => {
    let next = activeIndex;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (next + 1) % chapters.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (next - 1 + chapters.length) % chapters.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = chapters.length - 1;
    else return;
    event.preventDefault();
    activate(next);
    tabsRef.current[next]?.focus({ preventScroll: true });
  };

  const chapter = chapters[activeIndex];
  if (!chapter) return null;

  return (
    <div className="chapter-scrubber" ref={rootRef}>
      <div
        className="chapter-scrubber__scene"
        style={{ minHeight: Math.max(totalHeight, cardHeight) }}
      >
        <div className="chapter-scrubber__rail" role="tablist" aria-label={tr(label)} aria-orientation="vertical" onKeyDown={handleKeyDown}>
          {chapters.map((item, index) => (
            <button
              key={item.id}
              ref={(node) => { tabsRef.current[index] = node; }}
              id={`${baseId}-tab-${index}`}
              type="button"
              role="tab"
              className="chapter-scrubber__chapter"
              aria-selected={index === activeIndex}
              aria-controls={`${baseId}-preview`}
              aria-label={tr(`${index + 1} di ${chapters.length}: ${item.title}`)}
              tabIndex={index === activeIndex ? 0 : -1}
              onFocus={() => activate(index)}
              onClick={() => activate(index)}
              style={{ height: TICKS_PER_CHAPTER * ROW_HEIGHT }}
            >
              {tr(Array.from({ length: TICKS_PER_CHAPTER }, (_, tick) => (
                <Tick key={tick} index={index * TICKS_PER_CHAPTER + tick} pointer={pointer} current={index === activeIndex && (tick === 2 || tick === 3)} />
              )))}
            </button>
          ))}
        </div>

        <motion.div
          ref={cardRef}
          id={`${baseId}-preview`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${activeIndex}`}
          aria-live="off"
          tabIndex={0}
          className="chapter-scrubber__preview"
          style={{ y: previewY }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={chapter.id} initial={{ opacity: 0, y: reduced ? 0 : 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -4 }} transition={{ duration: reduced ? 0 : .16, ease: "easeOut" }}>
              <h3 className="chapter-scrubber__title">{tr(chapter.title)}</h3>
              <p className="chapter-scrubber__description">{tr(chapter.description)}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default ChapterScrubber;
