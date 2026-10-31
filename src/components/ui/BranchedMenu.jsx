"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./BranchedMenu.css";
import {useTranslation} from "../../i18n/context.js";


// Adapted from the supplied React Bits Branched Menu. Icons are React elements,
// so this version does not need Hugeicons or an animation dependency.
const PAD = 6;
const MARK = 18;
const toSet = (value) => new Set(Array.isArray(value) ? value : value >= 0 ? [value] : []);
const cssSize = (value) => typeof value === "number" ? `${value}px` : value;

export default function BranchedMenu({
  items = [],
  defaultOpen = 0,
  defaultActive = "",
  onSelect,
  onToggle,
  color = "var(--foreground)",
  accentColor = "var(--primary)",
  lineColor = "var(--border-strong)",
  width = 460,
  rowHeight = 52,
  indent = 44,
  trunk = 13,
  radius = 10,
  lineWidth = 1.5,
  fontSize = 17,
  drawDuration = 380,
  foldDuration = 280,
  className = "",
  ...props
}) {
  const {t:tr}=useTranslation();

  const id = useId();
  const [open, setOpen] = useState(() => toSet(defaultOpen));
  const [active, setActive] = useState(() => {
    if (defaultActive) return defaultActive;
    return items.find((item, i) => item.children?.length && toSet(defaultOpen).has(i))?.children[0]?.value ?? "";
  });
  const navRef = useRef(null);
  const headsRef = useRef([]);
  const markerRef = useRef(null);
  const activeSection = items.findIndex((item) => item.children?.some((child) => child.value === active));
  const markerShown = activeSection >= 0 && open.has(activeSection);

  // One entrance, only when the menu is visible. No timers or scrolling loop.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    if (!("IntersectionObserver" in window)) {
      nav.dataset.entered = "";
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      nav.dataset.entered = "";
      observer.disconnect();
    }, { threshold: 0.15 });
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const placeMarker = () => {
      const marker = markerRef.current;
      const head = headsRef.current[activeSection];
      if (!marker) return;
      if (head && markerShown) {
        marker.style.transform = `translateY(${head.offsetTop + (head.offsetHeight - MARK) / 2}px)`;
      }
      marker.toggleAttribute("data-on", Boolean(head && markerShown));
    };
    placeMarker();
    const observer = new ResizeObserver(placeMarker);
    if (navRef.current) observer.observe(navRef.current);
    return () => observer.disconnect();
  }, [activeSection, markerShown, items, rowHeight, fontSize]);

  const toggle = (index) => {
    const next = new Set(open);
    const isOpen = !next.has(index);
    if (isOpen) next.add(index);
    else next.delete(index);
    setOpen(next);
    onToggle?.(index, isOpen);
  };

  const select = (item) => {
    const value = item.value ?? item.label;
    setActive(value);
    onSelect?.(value, item);
  };

  const r = Math.max(0, Math.min(radius, rowHeight / 2 - 2, indent - 8 - trunk));
  const endX = indent - 8;
  const rowY = (index) => PAD + index * rowHeight + rowHeight / 2;
  const branch = (index) => `M ${trunk} ${rowY(index) - r} A ${r} ${r} 0 0 0 ${trunk + r} ${rowY(index)} H ${endX}`;
  const reach = (index) => `M ${trunk} 0 V ${rowY(index) - r} A ${r} ${r} 0 0 0 ${trunk + r} ${rowY(index)} H ${endX}`;

  return (
    <nav
      {...props}
      ref={navRef}
      className={`branched-menu ${className}`.trim()}
      style={{
        "--bm-w": cssSize(width),
        "--bm-ink": color,
        "--bm-accent": accentColor,
        "--bm-line": lineColor,
        "--bm-font": cssSize(fontSize),
        "--bm-row": `${rowHeight}px`,
        "--bm-indent": `${indent}px`,
        "--bm-line-w": lineWidth,
        "--bm-draw": `${drawDuration}ms`,
        "--bm-fold": `${foldDuration}ms`,
        ...props.style,
      }}
    >
      <span ref={markerRef} className="branched-menu__marker" aria-hidden="true" />
      {items.map((item, index) => {
        const children = item.children?.length ? item.children : null;
        const isOpen = Boolean(children && open.has(index));
        const panelId = `${id}-panel-${index}`;
        const headId = `${id}-head-${index}`;
        const leafActive = !children && (item.value ?? item.label) === active;
        const bodyHeight = children ? PAD * 2 + children.length * rowHeight : 0;
        const Head = item.href ? Link : "button";

        return (
          <div key={item.value ?? item.label} className="branched-menu__section" data-open={isOpen ? "" : undefined}>
            <div className="branched-menu__head-row"><Head
              ref={(element) => { headsRef.current[index] = element; }}
              id={headId}
              type={Head === "button" ? "button" : undefined}
              to={item.href || undefined}
              className="branched-menu__head"
              aria-expanded={children && !item.href ? isOpen : undefined}
              aria-controls={children && !item.href ? panelId : undefined}
              aria-current={leafActive ? "true" : undefined}
              data-active={leafActive ? "" : undefined}
              onClick={() => children ? !item.href && toggle(index) : select(item)}
            >
              <span>{tr(item.label)}{children && item.href && <span className="branched-menu__page-arrow" aria-hidden="true">↗</span>}</span>
              {children && !item.href && <span className="branched-menu__toggle" aria-hidden="true" />}
            </Head>
            {children && item.href && <button type="button" className="branched-menu__fold-button" aria-label={tr(`${isOpen ? "Chiudi" : "Apri"} i servizi ${item.label}`)} aria-expanded={isOpen} aria-controls={panelId} onClick={() => toggle(index)}><span className="branched-menu__toggle" aria-hidden="true" /></button>}
            </div>

            {children && (
              <div
                id={panelId}
                className="branched-menu__body"
                aria-labelledby={headId}
                aria-hidden={!isOpen}
                inert={!isOpen ? true : undefined}
              >
                <div className="branched-menu__fold">
                  <div className="branched-menu__tree" style={{ height: bodyHeight }}>
                    <svg className="branched-menu__lines" width={indent} height={bodyHeight} aria-hidden="true" focusable="false">
                      <path className="branched-menu__base" d={`M ${trunk} 0 V ${rowY(children.length - 1) - r}`} />
                      {children.map((child, childIndex) => <path key={child.value} className="branched-menu__base" d={branch(childIndex)} />)}
                      {children.map((child, childIndex) => (
                        <path
                          key={child.value}
                          className="branched-menu__reach"
                          data-active={child.value === active ? "" : undefined}
                          d={reach(childIndex)}
                          pathLength="1"
                        />
                      ))}
                    </svg>

                    {children.map((child) => {
                      const Row = child.href ? Link : "button";
                      return (
                        <Row
                          key={child.value}
                          to={child.href || undefined}
                          type={Row === "button" ? "button" : undefined}
                          className="branched-menu__item"
                          data-active={child.value === active ? "" : undefined}
                          aria-current={!child.href && child.value === active ? "true" : undefined}
                          tabIndex={isOpen ? 0 : -1}
                          onPointerEnter={(event) => {
                            if (event.pointerType === "mouse" || event.pointerType === "pen") setActive(child.value);
                          }}
                          onFocus={() => setActive(child.value)}
                          onClick={() => select(child)}
                        >
                          {child.icon && <span className="branched-menu__icon" aria-hidden="true">{tr(child.icon)}</span>}
                          <span className="branched-menu__label">{tr(child.label)}</span>
                        </Row>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
