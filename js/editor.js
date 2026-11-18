/**
 * The landing page's live demos, both driven by the real clip's own clock (video.currentTime):
 *
 * - the hero: the launch film, which widens as it rises through the screen
 * - the editor: the extension's caption looks, its four highlight modes, auto emoji, seeking by word
 *
 * The words and their times come from running the extension's Whisper model on the clip
 * (twitch.tv/stableronaldo, 10.5 to 23.5 s of the clip), not from a script.
 *
 * @module site/editor
 */

/** [text, start, end] in seconds of the 13-second clip, as Whisper timed them. */
const RAW = [
  ["Oh,", 2.38, 2.58], ["my", 2.58, 2.82], ["God!", 2.82, 3.04],
  ["Oh,", 3.3, 3.52], ["my", 3.58, 3.82], ["God!", 3.82, 4.04],
  ["Oh,", 4.14, 4.36], ["my", 4.42, 4.68], ["God!", 4.68, 4.9],
  ["Oh,", 5.28, 5.5], ["my", 5.56, 5.68], ["God!", 5.68, 5.78],
  ["Oh,", 5.94, 6.1], ["my", 6.1, 6.22], ["God!", 6.22, 6.38],
  ["Oh,", 6.76, 6.92], ["my", 6.92, 7.04], ["God!", 7.04, 7.14],
  ["Oh,", 7.76, 7.98], ["my", 8.08, 8.34], ["God!", 8.34, 8.56],
  ["Oh,", 9.06, 9.24], ["my", 9.24, 9.36], ["God!", 9.36, 9.46],
  ["Oh,", 9.62, 9.88], ["my", 10.0, 10.12], ["God!", 10.12, 10.22],
  ["Oh,", 10.54, 10.66], ["my", 10.66, 10.76], ["God!", 10.76, 10.86],
  ["Oh,", 11.24, 11.46], ["my", 12.02, 12.14], ["God!", 12.14, 12.24],
  ["Oh,", 12.54, 12.76], ["my", 12.82, 12.94], ["God!", 12.94, 13.0],
];

/**
 * Whisper gives shouted words almost no length; like the extension's grouping, each word is held until
 * the next one starts (at most 0.45 s), so a highlight is visible.
 */
const WORDS = RAW.map(([text, start, end], i) => {
  const next = RAW[i + 1]?.[1] ?? start + 0.45;
  return { i, text, start, end: Math.max(end, Math.min(next, start + 0.45)), emph: text.startsWith("God") };
});

/** One cue per "Oh, my God!"; the emoji the extension's hype rules add, never the same one twice in a row. */
const HYPE = ["😱", null, "🔥", null, "😭", null, "😱", null, "🔥", null, "😭", null];
const CUES = [];
for (let c = 0; c < WORDS.length / 3; c++) {
  const from = c * 3, to = from + 2;
  CUES.push({ from, to, start: WORDS[from].start - 0.05, end: (WORDS[to + 1]?.start ?? WORDS[to].end + 0.5) - 0.02, emoji: HYPE[c] });
}

/** The extension's streamer presets that suit this page (violet ones left out). */
const LOOKS = [
  { id: "gamer-pop", name: "Gamer Pop", font: "Luckiest Guy", upper: true, fill: "#ffffff", stroke: "#000000", sw: 7, hl: "#53fc18", mode: "fill" },
  { id: "titan", name: "Titan", font: "Titan One", fill: "#ffffff", stroke: "#1a1a1a", sw: 6, hl: "#ffe600", mode: "scale" },
  { id: "kick-green", name: "Kick Green", font: "Archivo Black", upper: true, fill: "#ffffff", stroke: "#000000", sw: 6, hl: "#53fc18", hlInk: "#000000", mode: "box", size: 10 },
  { id: "marker", name: "Marker", font: "Permanent Marker", fill: "#ffffff", stroke: "#000000", sw: 0, shadow: "0 .4cqw 1.6cqw rgb(0 0 0 / .95)", hl: "#ff2d55", mode: "fill" },
  { id: "breaking", name: "Breaking", font: "Oswald", weight: 700, upper: true, fill: "#ffffff", sw: 0, bg: "rgb(220 20 60 / .92)", hl: "#ffe600", mode: "underline", size: 10.5 },
  { id: "arcade", name: "Arcade", font: "Press Start 2P", upper: true, fill: "#ffffff", stroke: "#000000", sw: 4, hl: "#4de3ff", mode: "fill", size: 7 },
  { id: "ops", name: "Ops", font: "Black Ops One", upper: true, fill: "#e8e8e8", stroke: "#000000", sw: 5, hl: "#ff2d55", mode: "fill" },
  { id: "bowlby", name: "Big Bowl", font: "Bowlby One", upper: true, fill: "#ffe600", stroke: "#000000", sw: 7, hl: "#ffffff", mode: "scale", size: 10 },
];

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const cueAt = (t) => CUES.findIndex((c) => t >= c.start && t < c.end);
const wordAt = (t) => WORDS.findIndex((w) => t >= w.start && t < w.end);

/** Start a muted looping video unless the visitor asked for less motion; a refused autoplay leaves the poster. */
function autoplay(video) {
  if (reduced) return;
  video.play().catch(() => {});
}

// -----------------------------------------------------------------------------
// Hero: the launch film on its stage
// -----------------------------------------------------------------------------

/**
 * Plays the film muted, gives it play and sound controls, and widens its frame as it rises through the
 * screen (--grow 0 → 1). The width is the only thing the scroll drives; the words above never move.
 */
function mountStage(stage) {
  const video = stage.querySelector("[data-stage-video]");
  const play = stage.querySelector("[data-stage-play]");
  const sound = stage.querySelector("[data-stage-sound]");
  const sync = () => {
    stage.classList.toggle("is-paused", video.paused);
    play.setAttribute("aria-label", video.paused ? "Play the film" : "Pause the film");
  };
  play.addEventListener("click", () => (video.paused ? video.play().catch(() => {}) : video.pause()));
  sound.addEventListener("click", () => {
    video.muted = !video.muted;
    sound.setAttribute("aria-pressed", String(!video.muted));
    sound.textContent = video.muted ? "Sound off" : "Sound on";
    if (!video.muted && video.paused) video.play().catch(() => {});
  });
  video.addEventListener("play", sync);
  video.addEventListener("pause", sync);
  autoplay(video);
  sync();
  if (reduced) return;
  let queued = false;
  const grow = () => {
    queued = false;
    const r = stage.getBoundingClientRect();
    // 0 while the frame's top sits in the lower half of the screen, 1 once it reaches the top quarter
    const g = Math.min(1, Math.max(0, (innerHeight * 0.55 - r.top) / (innerHeight * 0.4)));
    stage.style.setProperty("--grow", g.toFixed(3));
  };
  addEventListener("scroll", () => { if (!queued) { queued = true; requestAnimationFrame(grow); } }, { passive: true });
  addEventListener("resize", grow);
  grow();
}

// -----------------------------------------------------------------------------
// Editor
// -----------------------------------------------------------------------------

const CLIP_LENGTH = 13;
/** Phosphor Trash (light), as on the extension’s caption rows. */
const TRASH = "M216,48H180V36A28,28,0,0,0,152,8H104A28,28,0,0,0,76,36V48H40a12,12,0,0,0,0,24h4V208a20,20,0,0,0,20,20H192a20,20,0,0,0,20-20V72h4a12,12,0,0,0,0-24ZM100,36a4,4,0,0,1,4-4h48a4,4,0,0,1,4,4V48H100Zm88,168H68V72H188ZM116,104v64a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Zm48,0v64a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Z";
const SWATCHES = ["#ffffff", "#ffe600", "#2bb5f0", "#53fc18", "#ff2d55", "#ff8a1f"];
const fmt = (t) => `0:${t.toFixed(2).padStart(5, "0")}`;

function mountEditor(root) {
  const $ = (sel) => root.querySelector(sel);
  const video = $("[data-ed-video]");
  const cap = $("[data-ed-cap]");
  const emojiEl = $("[data-ed-emoji]");
  const timeEl = $("[data-ed-time]");
  const timingEl = $("[data-ed-timing]");
  const playBtn = $("[data-ed-play]");
  const soundBtn = $("[data-ed-sound]");
  const hlSwitch = $("[data-ed-hl]");
  const emojiSwitch = $("[data-ed-emoji-toggle]");
  const modes = $("[data-ed-modes]");
  const card = $(".cx-card");
  const swatchesEl = $("[data-ed-swatches]");
  const looksEl = $("[data-ed-looks]");
  const search = $("[data-ed-search]");
  const empty = $("[data-ed-empty]");
  const cuesEl = $("[data-ed-cues]");
  const track = $("[data-ed-track]");
  const playhead = $("[data-ed-playhead]");
  const grid = playhead.parentElement;
  const state = { look: LOOKS[0], hl: true, emoji: true, mode: LOOKS[0].mode, color: null, cue: -2, word: -2 };

  const seek = (t) => { video.currentTime = t; state.cue = -2; render(true); };

  // the cue list (left panel) and the caption blocks on the timeline, one per cue
  const cueButtons = [], blocks = [];
  CUES.forEach((c, i) => {
    const text = WORDS.slice(c.from, c.to + 1).map((w) => w.text).join(" ").toUpperCase();
    const b = document.createElement("button");
    b.type = "button";
    const plain = WORDS.slice(c.from, c.to + 1).map((w) => w.text).join(" ");
    const s = Math.max(0, Math.round(c.start));
    b.innerHTML = `<small>0:${String(s).padStart(2, "0")}</small><span></span><svg viewBox="0 0 256 256" aria-hidden="true"><path d="${TRASH}"/></svg>`;
    b.querySelector("span").textContent = plain;
    b.addEventListener("click", () => seek(c.start + 0.06));
    cuesEl.append(b);
    cueButtons.push(b);
    const k = document.createElement("button");
    k.type = "button";
    // a block is under a second wide, so it carries the first word, as the real timeline does
    k.textContent = text.split(" ")[0].replace(/,$/, "");
    k.setAttribute("aria-label", `Caption ${i + 1}: ${text}, at ${c.start.toFixed(1)} seconds`);
    k.style.left = `${(Math.max(0, c.start) / CLIP_LENGTH) * 100}%`;
    k.style.width = `${((Math.min(c.end, CLIP_LENGTH) - Math.max(0, c.start)) / CLIP_LENGTH) * 100}%`;
    k.addEventListener("click", () => seek(c.start + 0.06));
    track.append(k);
    blocks.push(k);
  });
  // clicking the timeline anywhere seeks there
  $("[data-ed-timeline]").addEventListener("pointerdown", (e) => {
    if (e.target.closest("button")) return;
    const r = track.getBoundingClientRect();
    if (e.clientX < r.left) return;
    seek(Math.min(CLIP_LENGTH - 0.05, Math.max(0, ((e.clientX - r.left) / r.width) * CLIP_LENGTH)));
  });

  for (const look of LOOKS) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "ed-look";
    b.setAttribute("role", "option");
    b.dataset.look = look.id;
    b.title = `${look.name}, set in ${look.font}`;
    b.innerHTML = `<span class="ed-look__sample"></span><span class="ed-look__name"></span>`;
    const sample = b.querySelector(".ed-look__sample");
    sample.textContent = look.upper ? "AA GO" : "Aa Go";
    Object.assign(sample.style, sampleStyle(look));
    b.querySelector(".ed-look__name").textContent = look.name;
    b.addEventListener("click", () => setLook(look));
    looksEl.append(b);
  }
  search.addEventListener("input", () => {
    const q = search.value.trim().toLowerCase();
    let shown = 0;
    for (const b of looksEl.children) {
      const look = LOOKS.find((l) => l.id === b.dataset.look);
      const hit = !q || look.name.toLowerCase().includes(q) || look.font.toLowerCase().includes(q);
      b.hidden = !hit;
      if (hit) shown++;
    }
    empty.hidden = shown > 0;
  });

  for (const sw of SWATCHES) {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("role", "radio");
    b.setAttribute("aria-label", `Highlight colour ${sw}`);
    b.style.setProperty("--sw", sw);
    b.dataset.color = sw;
    b.addEventListener("click", () => { state.color = sw; paintColor(); if (!state.hl) hlSwitch.click(); });
    swatchesEl.append(b);
  }
  function paintColor() {
    const c = state.color ?? state.look.hl;
    cap.style.setProperty("--cap-hl", c);
    for (const b of swatchesEl.children) b.setAttribute("aria-checked", String(b.dataset.color.toLowerCase() === c.toLowerCase()));
  }

  playBtn.addEventListener("click", () => (video.paused ? video.play().catch(() => {}) : video.pause()));
  video.addEventListener("play", syncPlay);
  video.addEventListener("pause", syncPlay);
  soundBtn.addEventListener("click", () => {
    video.muted = !video.muted;
    soundBtn.setAttribute("aria-pressed", String(!video.muted));
    soundBtn.textContent = video.muted ? "Sound off" : "Sound on";
    if (!video.muted && video.paused) video.play().catch(() => {});
  });
  hlSwitch.addEventListener("click", () => {
    state.hl = !state.hl;
    hlSwitch.setAttribute("aria-checked", String(state.hl));
    card.toggleAttribute("data-hl-off", !state.hl);
    render(true);
  });
  emojiSwitch.addEventListener("click", () => {
    state.emoji = !state.emoji;
    emojiSwitch.setAttribute("aria-checked", String(state.emoji));
    state.cue = -2;
    render(true);
  });
  modes.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-mode]");
    if (!b) return;
    setMode(b.dataset.mode);
    if (!state.hl) hlSwitch.click();
  });
  // Arrow keys move between the radio buttons, as a radio group should.
  modes.addEventListener("keydown", (e) => {
    if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
    const all = [...modes.querySelectorAll("button")];
    const at = all.findIndex((b) => b.dataset.mode === state.mode);
    const next = all[(at + (e.key === "ArrowRight" ? 1 : all.length - 1)) % all.length];
    setMode(next.dataset.mode);
    next.focus();
    e.preventDefault();
  });

  function setMode(mode) {
    state.mode = mode;
    for (const b of modes.querySelectorAll("button")) {
      const on = b.dataset.mode === mode;
      b.setAttribute("aria-checked", String(on));
      b.tabIndex = on ? 0 : -1;
    }
    render(true);
  }

  function setLook(look) {
    state.look = look;
    state.color = null;
    for (const b of looksEl.children) b.setAttribute("aria-selected", String(b.dataset.look === look.id));
    const s = cap.style;
    s.setProperty("--cap-font", `"${look.font}"`);
    s.setProperty("--cap-weight", String(look.weight ?? 400));
    s.setProperty("--cap-size", `${look.size ?? 11}cqw`);
    s.setProperty("--cap-fill", look.fill);
    s.setProperty("--cap-stroke", look.stroke ?? "transparent");
    s.setProperty("--cap-sw", String(look.sw ?? 0));
    s.setProperty("--cap-hl-ink", look.hlInk ?? "#000000");
    s.setProperty("--cap-case", look.upper ? "uppercase" : "none");
    s.setProperty("--cap-shadow", look.shadow ?? "0 .6cqw 0 rgb(0 0 0 / .9)");
    s.setProperty("--cap-bg", look.bg ?? "transparent");
    cap.dataset.bg = look.bg ? "on" : "off";
    paintColor();
    setMode(look.mode);
  }

  function syncPlay() {
    root.classList.toggle("is-paused", video.paused);
    playBtn.setAttribute("aria-label", video.paused ? "Play the preview" : "Pause the preview");
  }

  function render(force) {
    const t = video.currentTime;
    const c = cueAt(t), w = wordAt(t);
    timeEl.textContent = fmt(t);
    grid.style.setProperty("--ph", String(Math.min(1, t / CLIP_LENGTH)));
    cap.dataset.hl = state.hl ? "on" : "off";
    cap.dataset.mode = state.mode;
    if (c !== state.cue || force) {
      const fresh = c !== state.cue;
      state.cue = c;
      cap.textContent = "";
      emojiEl.classList.remove("is-on");
      cueButtons.forEach((b, i) => b.classList.toggle("is-on", i === c));
      blocks.forEach((b, i) => b.classList.toggle("is-on", i === c));
      if (c >= 0) {
        const cue = CUES[c];
        timingEl.textContent = `${fmt(Math.max(0, cue.start)).slice(0, 7)} → ${fmt(Math.min(cue.end, CLIP_LENGTH)).slice(0, 7)}`;
        const line = document.createElement("span");
        line.className = "ed-cap__line";
        for (let i = cue.from; i <= cue.to; i++) {
          const s = document.createElement("span");
          s.className = "w" + (WORDS[i].emph && state.emoji ? " is-emph" : "") + (fresh && !reduced ? " is-in" : "");
          s.dataset.i = String(i);
          s.textContent = WORDS[i].text;
          line.append(s);
        }
        cap.append(line);
        if (cue.emoji && state.emoji) {
          emojiEl.textContent = cue.emoji;
          void emojiEl.offsetWidth;
          emojiEl.classList.add("is-on");
        }
      }
    }
    if (w !== state.word || force) {
      state.word = w;
      for (const s of cap.querySelectorAll(".w")) s.classList.toggle("is-on", Number(s.dataset.i) === w);
    }
  }

  const tick = () => { render(false); requestAnimationFrame(tick); };
  video.addEventListener("seeked", () => render(true));
  setLook(LOOKS[0]);
  if (reduced) video.currentTime = 2.9;
  autoplay(video);
  syncPlay();
  render(true);
  requestAnimationFrame(tick);
}

function sampleStyle(look) {
  return {
    fontFamily: `"${look.font}", system-ui, sans-serif`,
    fontWeight: String(look.weight ?? 400),
    color: look.fill,
    webkitTextStroke: look.sw ? `${Math.max(2, look.sw * 0.6)}px ${look.stroke}` : "0",
    paintOrder: "stroke fill",
    textShadow: look.sw ? "0 2px 0 rgb(0 0 0 / .9)" : "0 2px 8px rgb(0 0 0 / .9)",
    background: look.bg ?? "",
    padding: look.bg ? "2px 8px" : "",
    fontSize: look.font === "Press Start 2P" ? "13px" : "",
  };
}

/**
 * PERF: the eight caption faces, and only the glyphs the demos use (Google Fonts' `text=` subset), so
 * they add a few kilobytes instead of a few hundred.
 */
function loadFonts() {
  const families = [...new Set(LOOKS.map((l) => (l.weight ? `${l.font}:wght@${l.weight}` : l.font)))]
    .map((f) => "family=" + f.replace(/ /g, "+"))
    .join("&");
  const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$,’'!";
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?${families}&text=${encodeURIComponent(glyphs)}&display=swap`;
  document.head.append(link);
}

loadFonts();
const stage = document.querySelector("[data-stage]");
if (stage) mountStage(stage);
const editorRoot = document.querySelector("[data-editor]");
if (editorRoot) mountEditor(editorRoot);

// The export screen's clip autoplays from markup because the pinned-chapters moment copies the step
// visuals into its own screen; reduced motion stops every copy once they exist.
if (reduced) addEventListener("load", () => {
  for (const v of document.querySelectorAll(".st-export__thumb")) { v.removeAttribute("autoplay"); v.pause(); }
});
