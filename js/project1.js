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
  createProcessStep,
} from "./layout.js";
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
      image: "assets/icons/Search.svg",
    },
    {
      title: "designprocess_title2",
      methods: [
        "designprocess_concept_method1",
        "designprocess_concept_method2",
      ],
      image: "assets/icons/Choose.svg",
    },
    {
      title: "designprocess_title3",
      methods: ["designprocess_design_method1", "designprocess_design_method2"],
      image: "assets/icons/Colorpalett.svg",
    },
  ];

  const sections = [
    { type: "group-start" },
    { type: "details", data: details },
    {
      type: "twoColumn",
      left: "tasks",
      text: "tasks_project1",
    },
    {
      type: "youtube-video",
      src: "https://www.youtube.com/watch?v=_oMTvgcB48U&t=2s",
    },
    {
      type: "twoColumn",
      left: "problemstatement",
      text: "problemstatement_project1",
    },
    {
      type: "twoColumn",
      left: "goals",
      text: "goals_project1",
    },
    {
      type: "twoColumn",
      left: "usergroup",
      text: "usergroup_project1",
    },
    { type: "designPhases", data: designPhases },
    { type: "group-end" },
    { type: "step", h1: "designprocess_title1" },
    { type: "group-start" },
    {
      type: "twoColumn",
      left: "preface",
      text: "preface_project1",
    },
    {
      type: "twoColumn",
      left: "deskresearch",
      text: "deskresearch_project1",
    },
    {
      type: "twoColumn",
      left: "competitiveanalysis",
      text: "competitiveanalysis_project1",
    },
    { type: "group-end" },
    {
      type: "twoColumn",
      left: "flowgraph",
      text: "flowgraph_project1",
    },
    {
      type: "image",
      src: "assets/images/project-fischer/FischerProfil_Flowgraph.webp",
    },
    {
      type: "twoColumn",
      left: "prototypes",
      text: "prototypes_project1",
    },
    {
      type: "image",
      src: "assets/images/project-fischer/FischerProfil_Prototypen.webp",
    },
    {
      type: "twoColumn",
      left: "designsystem",
      text: "designsystem_project1",
    },
    {
      type: "image",
      src: "assets/images/project-fischer/FischerProfil_DesignSystem.webp",
    },
    {
      type: "twoColumn",
      left: "userinterface",
      text: "userinterface_project1",
    },
    {
      type: "image",
      src: "assets/images/project-fischer/FischerProfil_UI_Sidebar_Tutorial.webp",
    },
    {
      type: "image",
      src: "assets/images/project-fischer/FischerProfil_UI.webp",
    },
    {
      type: "twoColumn",
      left: "moredrafts",
      text: "moredrafts_project1",
    },
    {
      type: "twoColumn",
      left: "researchtesting",
      text: "researchtesting_project1",
    },
  ];

  let groupWrapper = null; // für <div class="content-wrapper">

  sections.forEach((sec) => {
    if (sec.type === "group-start") {
      groupWrapper = document.createElement("div");
      groupWrapper.classList.add("content-wrapper");
      return;
    }

    if (sec.type === "group-end") {
      if (groupWrapper) {
        container.appendChild(groupWrapper);
        groupWrapper = null;
      }
      return;
    }
    let el;
    if (sec.type === "twoColumn") {
      const p = document.createElement("p");
      p.setAttribute("data-i18n", sec.text);
      const content = getTranslation(sec.text, currentLang);
      if (content.includes("<br>") || content.includes("\n")) {
        p.setAttribute("data-i18n-html", "");
        p.innerHTML = content;
      } else {
        p.textContent = content;
      }
      el = createTwoColumnSection(sec.left, [p], translations, currentLang);
    } else if (sec.type === "youtube-video") {
      const iframe = document.createElement("iframe");
      iframe.src = convertYouTubeUrl(sec.src);
      iframe.title = "YouTube video player";
      iframe.frameBorder = "0";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;

      el = document.createElement("div");
      el.classList.add("youtube-wrapper");
      el.appendChild(iframe);
    } else if (sec.type === "designPhases") {
      el = createDesignProcessSection(sec.data, translations, currentLang);
    } else if (sec.type === "step") {
      el = createProcessStep({ title: sec.h1 }, translations, currentLang);
    } else if (sec.type === "details") {
      el = createDetailsSection(sec.data, translations, currentLang);
    } else if (sec.type === "image") {
      const img = document.createElement("img");
      img.src = sec.src;
      img.loading = "lazy";
      el = document.createElement("div");
      el.appendChild(img);
    }
    if (el) {
      el.classList.add("dynamic-section");
      if (groupWrapper) {
        groupWrapper.appendChild(el);
      } else {
        container.appendChild(el);
      }
    }
  });
}
