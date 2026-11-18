/**
 * The hero's film enters last: it waits hidden with the words (motion.css holds everything after the h1 until
 * motion.js starts the entrance), then slides up and fades in under them once the headline is rising.
 *
 * Mark the film's wrapper with `data-enter-film` inside a `.hero[data-enter]`. When the kit stands the hero still
 * (reduced motion, a reload half way down, a late script) the film simply stays put.
 */
const film = document.querySelector(".hero[data-enter] [data-enter-film]");
const hero = film?.closest(".hero");

if (film && hero) {
  const start = () => {
    if (hero.classList.contains("is-still")) return stop();
    film.classList.add("film-in");
    stop();
  };
  const watch = new MutationObserver(() => {
    if (hero.classList.contains("is-entering")) start();
    else if (hero.classList.contains("is-entered")) stop();
  });
  const stop = () => watch.disconnect();
  if (hero.classList.contains("is-entering")) start();
  else if (!hero.classList.contains("is-entered")) watch.observe(hero, { attributes: true, attributeFilter: ["class"] });
}
