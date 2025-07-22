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
    { type: "details", data: details },
    {
      type: "twoColumn",
      left: "project1_sec1_title",
      text: "project1_sec1_text",
    },
    {
      type: "youtube-video",
      src: "https://www.youtube.com/watch?v=_oMTvgcB48U&t=2s",
    },
    {
      type: "twoColumn",
      left: "project1_sec2_title",
      text: "project1_sec2_text",
    },
    {
      type: "image",
      src: "assets/images/project-fischer/FischerProfil_UI.webp",
    },
    { type: "designPhases", data: designPhases },
  ];

  sections.forEach((sec) => {
    let el;
    if (sec.type === "twoColumn") {
      const p = document.createElement("p");
      p.textContent = getTranslation(sec.text, currentLang);
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
      container.appendChild(el);
    }
  });
}

function convertYouTubeUrl(url) {
  const urlObj = new URL(url);
  const videoId = urlObj.searchParams.get("v");
  const start = urlObj.searchParams.get("t");

  let embedUrl = `https://www.youtube.com/embed/${videoId}`;
  if (start) {
    // YouTube erlaubt Startzeit im Format Sekunden
    const seconds = parseYouTubeStartTime(start);
    embedUrl += `?start=${seconds}`;
  }

  return embedUrl;
}

function parseYouTubeStartTime(t) {
  // "2s" oder "1m30s" -> Sekunden umrechnen
  const match = t.match(/(?:(\d+)m)?(\d+)s/);
  if (!match) return 0;
  const minutes = parseInt(match[1] || 0, 10);
  const seconds = parseInt(match[2] || 0, 10);
  return minutes * 60 + seconds;
}
