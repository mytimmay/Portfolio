import {
  setLanguage,
  currentLang,
  translations,
  initLangToggle,
  getTranslation,
} from "./i18n.js";
import { initNav } from "./nav.js";
import { initFadeAnimations } from "./animations.js";
import { loadHeader } from "./header.js";
import {
  createTwoColumnSection,
  createDesignProcessSection,
  createDetailsSection,
} from "./layout.js";

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

  container.querySelectorAll(".dynamic-section").forEach((el) => el.remove());

  const details = [
    { title: "project_detail1", items: ["project_role1"] },
    { title: "project_detail2", items: ["software_1"] },
    {
      title: "project_detail3",
      items: ["project_team1", "project_team3", "project_team4"],
    },
    { title: "project_detail4", items: ["project1_year"] },
  ];

  const designPhases = [
    {
      title: "designprocess_title1",
      methods: [
        "designprocess_analyse_method1",
        "designprocess_analyse_method2",
      ],
    },
    {
      title: "designprocess_title2",
      methods: [
        "designprocess_concept_method1",
        "designprocess_concept_method2",
      ],
    },
    {
      title: "designprocess_title3",
      methods: ["designprocess_design_method1", "designprocess_design_method2"],
    },
  ];

  const sections = [
    { type: "details", data: details },
    {
      type: "twoColumn",
      left: "project1_sec1_title",
      text: "project1_sec1_text",
    },
    {
      type: "twoColumn",
      left: "project1_sec2_title",
      text: "project1_sec2_text",
    },
    { type: "designPhases", data: designPhases },
  ];

  sections.forEach((sec) => {
    let el;
    if (sec.type === "twoColumn") {
      const p = document.createElement("p");
      p.textContent = getTranslation(sec.text, currentLang);
      el = createTwoColumnSection(sec.left, [p], translations, currentLang);
    } else if (sec.type === "video") {
      const vid = document.createElement("video");
      vid.src = sec.src;
      vid.controls = true;
      el = document.createElement("div");
      el.appendChild(vid);
    } else if (sec.type === "designPhases") {
      el = createDesignProcessSection(sec.data, translations, currentLang);
    } else if (sec.type === "details") {
      el = createDetailsSection(sec.data, translations, currentLang);
    }
    if (el) {
      el.classList.add("dynamic-section");
      container.appendChild(el);
    }
  });
}
