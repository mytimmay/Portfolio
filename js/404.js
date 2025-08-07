import {
  setLanguage,
  currentLang,
  initLangToggle,
  getTranslation,
} from "./i18n.js";

document.addEventListener("DOMContentLoaded", async () => {
  await setLanguage(localStorage.getItem("lang") || "de");
});
