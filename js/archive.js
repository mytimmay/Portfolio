import { setLanguage, initLangToggle, getInitialLanguage } from "./i18n.js";
import { initNav } from "./nav.js";
import { initFadeAnimations } from "./animations.js";
import { loadHeader } from "./header.js";
import { loadFooter } from "./footer.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeader();
  await setLanguage(getInitialLanguage());

  initLangToggle();

  initNav();
  initFadeAnimations();
  await loadFooter();
});
