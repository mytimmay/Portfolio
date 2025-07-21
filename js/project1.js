import { setLanguage, currentLang } from "./i18n.js";
import { initNav } from "./nav.js";
import { initFadeAnimations } from "./animations.js";
import { loadHeader } from "./header.js";
import { loadHeroProject } from "./heroProject.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeader();
  loadHeroProject({
    titleKey: "project1_title",
    textKey: "project1_text",
    imageSrc: "./assets/images/project-cards/FischerShowroom-Image.webp",
    alt: "Fischer Profil Showroom",
    projectClass: "project1",
  });
  await setLanguage(localStorage.getItem("lang") || "de");

  document
    .getElementById("lang-toggle")
    ?.addEventListener("click", async () => {
      const newLang = currentLang === "de" ? "en" : "de";
      await setLanguage(newLang);
    });

  initNav();
  initFadeAnimations();
});
