import test from "node:test";
import assert from "node:assert/strict";
import { observeChapterAutoplay } from "../src/lib/chapter-autoplay.js";

function setup(t) {
  t.mock.timers.enable({ apis: ["setInterval"] });
  const document = new EventTarget();
  document.hidden = false;
  const observers = [];
  const events = [];
  const element = {};
  let chapter = 0;
  const environment = {
    document,
    setInterval: (...args) => setInterval(...args),
    clearInterval: (timer) => clearInterval(timer),
    IntersectionObserver: class {
      constructor(callback) { this.callback = callback; observers.push(this); }
      observe(target) { assert.equal(target, element); }
      disconnect() { this.disconnected = true; }
    },
  };
  const mount = () => observeChapterAutoplay(element, {
    onEnter: () => { chapter = 0; events.push("enter"); },
    onAdvance: () => { chapter = (chapter + 1) % 5; events.push(chapter); },
  }, environment);
  const cleanup = mount();
  t.after(cleanup);
  return {
    events, observers, mount, cleanup,
    tick: (time) => t.mock.timers.tick(time),
    view: (isIntersecting) => observers.at(-1).callback([{ isIntersecting }]),
    visibility: (hidden) => { document.hidden = hidden; document.dispatchEvent(new Event("visibilitychange")); },
  };
}

test("starts on entry and advances at exactly 1500 ms, including the last-to-first loop", (t) => {
  const playback = setup(t);
  playback.tick(10000);
  assert.deepEqual(playback.events, []);
  playback.view(true);
  playback.tick(1499);
  assert.deepEqual(playback.events, ["enter"]);
  playback.tick(1);
  assert.deepEqual(playback.events, ["enter", 1]);
  playback.tick(6000);
  assert.deepEqual(playback.events, ["enter", 1, 2, 3, 4, 0]);
});

test("leaving clears the clock and re-entry gives the first card a full 1500 ms", (t) => {
  const playback = setup(t);
  playback.view(true);
  playback.tick(1600);
  playback.view(false);
  playback.tick(20000);
  assert.deepEqual(playback.events, ["enter", 1]);
  playback.view(true);
  playback.tick(1499);
  assert.deepEqual(playback.events, ["enter", 1, "enter"]);
  playback.tick(1);
  assert.deepEqual(playback.events, ["enter", 1, "enter", 1]);
});

test("a hidden browser tab suspends playback, without a burst of skipped cards on return", (t) => {
  const playback = setup(t);
  playback.view(true);
  playback.tick(700);
  playback.visibility(true);
  playback.tick(30000);
  assert.deepEqual(playback.events, ["enter"]);
  playback.visibility(false);
  playback.tick(1499);
  assert.deepEqual(playback.events, ["enter"]);
  playback.tick(1);
  assert.deepEqual(playback.events, ["enter", 1]);
});

test("cleanup and remount cannot leave duplicate clocks or visibility listeners", (t) => {
  const playback = setup(t);
  playback.view(true);
  playback.cleanup();
  assert.equal(playback.observers[0].disconnected, true);
  playback.visibility(true);
  playback.visibility(false);
  playback.tick(5000);
  assert.deepEqual(playback.events, ["enter"]);
  const cleanup = playback.mount();
  t.after(cleanup);
  playback.view(true);
  playback.view(true);
  playback.tick(1500);
  assert.deepEqual(playback.events, ["enter", "enter", 1]);
});
