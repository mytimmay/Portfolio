import { setLanguage, initLangToggle, currentLang, translations } from "./i18n.js";
import { initNav } from "./nav.js";
import { initFadeAnimations } from "./animations.js";
import { loadHeader } from "./header.js";
import { createDetailsSection } from "./layout.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeader();
  await setLanguage(localStorage.getItem("lang") || "de");

  initLangToggle(renderSections);

  initNav();
  renderSections();
  initFadeAnimations();
});

function renderSections() {
  const container = document.querySelector(".content-wrapper");
  if (!container) return;

  container.innerHTML = "";

  const details = [
    {
      title: "project_detail1",
      items: [
        "project_role1",
        "project_role2",
        "project_role3",
        "project_role4",
        "project_role5",
      ],
    },
    {
      title: "project_detail2",
      items: ["software_1", "software_6", "software_7", "software_10", "software_11"],
    },
    {
      title: "project_detail3",
      items: ["project_team1", "project_team2", "project_team3", "project_team4"],
    },
    { title: "project_detail4", items: ["project2_year"] },
  ];

  const el = createDetailsSection(details, translations, currentLang);
  el.classList.add("dynamic-section");
  container.appendChild(el);
}
