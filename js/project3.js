import {
  setLanguage,
  initLangToggle,
  currentLang,
  translations,
} from "./i18n.js";
import { initNav } from "./nav.js";
import { initFadeAnimations } from "./animations.js";
import { loadHeader } from "./header.js";
import { createDetailsSection, createProjectHeroSection } from "./layout.js";
import { convertYouTubeUrl } from "./youtubeUtils.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeader();
  await setLanguage(localStorage.getItem("lang") || "de");

  initLangToggle();

  initNav();
  renderSections();
  initFadeAnimations();
});

function renderSections() {
  const container = document.querySelector(".smooth-wrapper");
  const main = document.querySelector("main");
  if (!container || !main) return;

  main.querySelector(".hero-project")?.remove();

  const hero = createProjectHeroSection(
    {
      className: "project3",
      titleKey: "project3_title",
      textKey: "project3_text",
      imageSrc: "assets/images/project-cards/VispaWorkshop-Image.webp",
      imageAlt: "VISPA Workshops",
    },
    translations,
    currentLang
  );

  main.insertBefore(hero, container);

  container.innerHTML = "";

  const details = [
    {
      title: "project_detail1",
      items: [
        "project_role1",
        "project_role3",
        "project_role4",
        "project_role5",
      ],
    },
    {
      title: "project_detail2",
      items: [
        "software_2",
        "software_6",
        "software_7",
        "software_10",
        "software_11",
      ],
    },
    {
      title: "project_detail3",
      items: [
        "project_team1",
        "project_team2",
        "project_team3",
        "project_team4",
      ],
    },
    { title: "project_detail4", items: ["project3_year"] },
  ];

  const el = createDetailsSection(details, translations, currentLang);
  el.classList.add("dynamic-section");
  container.appendChild(el);
}
