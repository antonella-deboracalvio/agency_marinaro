import test from "node:test";
import assert from "node:assert/strict";
import { observeBrandAutoplay } from "../src/lib/brand-autoplay.js";

function setup(t) {
  t.mock.timers.enable({ apis: ["setInterval"] });
  const document = new EventTarget();
  document.hidden = false;
  const mobile = Object.assign(new EventTarget(), { matches: true });
  const reduced = Object.assign(new EventTarget(), { matches: false });
  const observers = [];
  const sequence = [];
  let active = 0;
  let prepared = 0;
  const environment = {
    document,
    matchMedia: (query) => query.includes("max-width") ? mobile : reduced,
    setInterval: (...args) => setInterval(...args),
    clearInterval: (id) => clearInterval(id),
    IntersectionObserver: class {
      constructor(callback) { this.callback = callback; observers.push(this); }
      observe() {}
      disconnect() { this.disconnected = true; }
    },
  };
  const controller = observeBrandAutoplay({}, {
    prepare: () => { prepared += 1; },
    advance: () => { active = (active + 1) % 7; sequence.push(active); },
  }, environment);
  t.after(() => controller.destroy());
  return {
    controller, sequence, observers,
    tick: (time) => t.mock.timers.tick(time),
    view: (ratio) => observers[0].callback([{ isIntersecting: ratio > 0, intersectionRatio: ratio }]),
    mobile: (matches) => { mobile.matches = matches; mobile.dispatchEvent(new Event("change")); },
    reduced: (matches) => { reduced.matches = matches; reduced.dispatchEvent(new Event("change")); },
    hidden: (value) => { document.hidden = value; document.dispatchEvent(new Event("visibilitychange")); },
    prepared: () => prepared,
  };
}

test("the first mockup stays for 1.5 seconds, then all seven loop at 1500 ms", t => {
  const p = setup(t);
  p.tick(10000);
  p.view(.2);
  p.tick(10000);
  assert.deepEqual(p.sequence, []);
  p.view(.8);
  assert.equal(p.prepared(), 1);
  p.tick(1499);
  assert.deepEqual(p.sequence, []);
  p.tick(1);
  p.tick(9000);
  assert.deepEqual(p.sequence, [1, 2, 3, 4, 5, 6, 0]);
});

test("desktop and reduced-motion preferences prevent autoplay, including after a resize", t => {
  const p = setup(t);
  p.mobile(false);
  p.view(1);
  p.tick(5000);
  assert.deepEqual(p.sequence, []);
  p.mobile(true);
  p.tick(1500);
  assert.deepEqual(p.sequence, [1]);
  p.reduced(true);
  p.tick(5000);
  assert.deepEqual(p.sequence, [1]);
  p.reduced(false);
  p.tick(1500);
  assert.deepEqual(p.sequence, [1, 2]);
});

test("touch, keyboard focus and the image viewer pause the clock without catch-up", t => {
  const p = setup(t);
  p.view(1);
  p.tick(600);
  p.controller.setPaused(true);
  p.tick(6000);
  assert.deepEqual(p.sequence, []);
  p.controller.setPaused(false);
  p.tick(1499);
  assert.deepEqual(p.sequence, []);
  p.tick(1);
  assert.deepEqual(p.sequence, [1]);
  p.controller.setPaused(false);
  p.tick(1500);
  assert.deepEqual(p.sequence, [1, 2]);
});

test("hidden tabs, leaving the viewport and unmounting cannot leave a running timer", t => {
  const p = setup(t);
  p.view(1);
  p.hidden(true);
  p.tick(9000);
  p.hidden(false);
  p.tick(1500);
  assert.deepEqual(p.sequence, [1]);
  p.view(0);
  p.tick(9000);
  assert.deepEqual(p.sequence, [1]);
  p.view(1);
  p.controller.destroy();
  assert.equal(p.observers[0].disconnected, true);
  p.hidden(true);
  p.hidden(false);
  p.mobile(false);
  p.mobile(true);
  p.tick(9000);
  assert.deepEqual(p.sequence, [1]);
});
