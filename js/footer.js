/**
 * The footer's one entrance.
 *
 * When the footer first comes into view its sheet rises, its parts follow in order and the wordmark's letters come
 * up from the bottom edge. Once, never again. Under reduced motion (or without IntersectionObserver) nothing is
 * hidden.
 */
const footer = document.querySelector("[data-cf]");

if (footer) {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduced && "IntersectionObserver" in window) {
    footer.setAttribute("data-cf-wait", "");
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        footer.removeAttribute("data-cf-wait");
      },
      { threshold: 0.15 },
    );
    io.observe(footer);
  }
}
