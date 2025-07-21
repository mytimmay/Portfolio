import { setLanguage, initLangToggle, currentLang } from "./i18n.js";
import { initNav } from "./nav.js";
import { initFadeAnimations } from "./animations.js";
import { loadHeader } from "./header.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeader();
  await setLanguage(localStorage.getItem("lang") || "de");

  initLangToggle();

  initNav();
  initFadeAnimations();
});
