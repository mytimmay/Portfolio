import { setLanguage, currentLang, translations } from "./i18n.js";
import { initNav } from "./nav.js";

document.addEventListener("DOMContentLoaded", async () => {
  await setLanguage(localStorage.getItem("lang") || "de");

  document
    .getElementById("lang-toggle")
    ?.addEventListener("click", async () => {
      const newLang = currentLang === "de" ? "en" : "de";
      await setLanguage(newLang);
      loadExperience(); // Erfahrungseinträge neu übersetzen
    });

  initNav();
  loadExperience();
});

async function loadExperience() {
  const container = document.getElementById("experience-list");
  if (!container) return;

  try {
    const res = await fetch("data/about.json");
    const data = await res.json();
    container.innerHTML = "";

    data.experience.forEach((job) => {
      const wrapper = document.createElement("div");
      wrapper.className = "experience-entry";

      const title = document.createElement("div");
      title.className = "job-title";
      title.textContent = translations[job.title]?.[currentLang] || job.title;

      const company = document.createElement("div");
      company.className = "job-company";
      company.textContent =
        translations[job.company]?.[currentLang] || job.company;

      const period = document.createElement("div");
      period.className = "job-period";
      period.textContent =
        translations[job.period]?.[currentLang] || job.period;

      const text = document.createElement("div");
      text.className = "job-text";
      text.textContent = translations[job.text]?.[currentLang] || job.text;

      wrapper.append(title, company, period, text);
      container.appendChild(wrapper);
    });
  } catch (err) {
    console.error("Fehler beim Laden der Erfahrung:", err);
  }
}
