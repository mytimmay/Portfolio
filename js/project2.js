import { setLanguage, currentLang } from "./i18n.js";
import { initNav } from "./nav.js";
import { initFadeAnimations } from "./animations.js";
import { loadHeader } from "./header.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeader();
  await setLanguage(localStorage.getItem("lang") || "de");

  document.getElementById("lang-toggle")?.addEventListener("click", async () => {
    const newLang = currentLang === "de" ? "en" : "de";
    await setLanguage(newLang);
  });

  initNav();
  initFadeAnimations();
});
