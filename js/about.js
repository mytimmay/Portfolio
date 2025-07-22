import {
  setLanguage,
  currentLang,
  translations,
  initLangToggle,
  getTranslation,
} from "./i18n.js";
import { initNav } from "./nav.js";
import { createTwoColumnSection } from "./layout.js";
import { initFadeAnimations } from "./animations.js";
import { loadHeader } from "./header.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeader();
  await setLanguage(localStorage.getItem("lang") || "de");

  initLangToggle(async () => {
    await loadExperience(); // Erfahrungseinträge neu übersetzen
  });

  initNav();
  await loadExperience();
  initFadeAnimations();
});

async function loadExperience() {
  const container = document.getElementById("experience-section");
  if (!container) return;

  try {
    const res = await fetch("data/about.json");
    const data = await res.json();

    const entries = data.experience.map((job) => {
      const wrapper = document.createElement("div");
      wrapper.className = "experience-entry";

      const title = document.createElement("h5");
      title.className = "job-title";
      title.textContent = getTranslation(job.title, currentLang);

      const metaWrapper = document.createElement("div");
      metaWrapper.className = "job-meta";

      const company = document.createElement("div");
      company.className = "job-company";
      company.textContent = getTranslation(job.company, currentLang);

      const period = document.createElement("div");
      period.className = "job-period";
      period.textContent = getTranslation(job.period, currentLang);

      metaWrapper.append(company, period);

      const text = document.createElement("div");
      text.className = "job-text";
      text.textContent = getTranslation(job.text, currentLang);

      wrapper.append(title, metaWrapper, text);
      return wrapper;
    });

    container.innerHTML = "";
    container.appendChild(
      createTwoColumnSection(
        "about-experience-headline",
        entries,
        translations,
        currentLang,
        "experience-list"
      )
    );
    initFadeAnimations();
  } catch (err) {
    console.error("Fehler beim Laden der Erfahrung:", err);
  }
}
