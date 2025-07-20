import { setLanguage, currentLang, translations } from "./i18n.js";
import { initNav } from "./nav.js";
import { createTwoColumnSection } from "./layout.js";
import { initFadeAnimations } from "./animations.js";

document.addEventListener("DOMContentLoaded", async () => {
  await setLanguage(localStorage.getItem("lang") || "de");

  document
    .getElementById("lang-toggle")
    ?.addEventListener("click", async () => {
      const newLang = currentLang === "de" ? "en" : "de";
      await setLanguage(newLang);
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
      wrapper.className = "experience-entry fade-right";

      const title = document.createElement("h5");
      title.className = "job-title";
      title.textContent = translations[job.title]?.[currentLang] || job.title;

      const metaWrapper = document.createElement("div");
      metaWrapper.className = "job-meta";

      const company = document.createElement("div");
      company.className = "job-company";
      company.textContent =
        translations[job.company]?.[currentLang] || job.company;

      const period = document.createElement("div");
      period.className = "job-period";
      period.textContent =
        translations[job.period]?.[currentLang] || job.period;

      metaWrapper.append(company, period);

      const text = document.createElement("div");
      text.className = "job-text";
      text.textContent = translations[job.text]?.[currentLang] || job.text;

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
