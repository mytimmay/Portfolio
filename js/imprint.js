import {
  setLanguage,
  currentLang,
  initLangToggle,
  getTranslation,
} from "./i18n.js";
import { initNav } from "./nav.js";
import { initFadeAnimations } from "./animations.js";
import { loadHeader } from "./header.js";
import { loadFooter } from "./footer.js";
import {
  createTwoColumnSection,
  createDesignProcessSection,
  createDetailsSection,
  createProcessStep,
  createProjectHeroSection,
  createMoreProjectsSection,
} from "./layout.js";
import { convertYouTubeUrl } from "./youtubeUtils.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeader();
  await setLanguage(localStorage.getItem("lang") || "de");

  initLangToggle();
  initNav();
  renderSections();
  initFadeAnimations();
  await loadFooter();
});
