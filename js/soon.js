/**
 * The coming-soon page's film: plays it muted and wires its play button. The recorder bar in the page's corner
 * is the extension's own, loaded from bar.js.
 */

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

const frame = document.querySelector("[data-soon-frame]");
if (frame) {
  const video = frame.querySelector("[data-soon-video]");
  const play = frame.querySelector("[data-soon-play]");
  const sync = () => {
    frame.classList.toggle("is-paused", video.paused);
    play.setAttribute("aria-label", video.paused ? "Play the film" : "Pause the film");
  };
  play.addEventListener("click", () => (video.paused ? video.play().catch(() => {}) : video.pause()));
  video.addEventListener("play", sync);
  video.addEventListener("pause", sync);
  if (!reduced) video.play().catch(() => {});
  sync();
}
