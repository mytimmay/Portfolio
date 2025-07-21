import { setLanguage, currentLang, translations, initLangToggle } from "./i18n.js";
import { initNav } from "./nav.js";
import { initFadeAnimations } from "./animations.js";
import { loadHeader } from "./header.js";
import { createTwoColumnSection, createDesignProcessSection } from "./layout.js";

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

  const sections = [
    { type: "twoColumn", left: "project1_sec1_title", text: "project1_sec1_text" },
    { type: "video", src: "./assets/videos/TimSchedlbauer_Portfoliovideo_Scene1.webm" },
    { type: "twoColumn", left: "project1_sec2_title", text: "project1_sec2_text" },
    { type: "designprocess" }
  ];

  sections.forEach((sec) => {
    let el;
    if (sec.type === "twoColumn") {
      const p = document.createElement("p");
      p.textContent = translations[sec.text]?.[currentLang] || sec.text;
      el = createTwoColumnSection(sec.left, [p], translations, currentLang);
    } else if (sec.type === "video") {
      const vid = document.createElement("video");
      vid.src = sec.src;
      vid.controls = true;
      el = document.createElement("div");
      el.appendChild(vid);
    } else if (sec.type === "designprocess") {
      el = createDesignProcessSection(translations, currentLang);
    }
    if (el) {
      el.classList.add("dynamic-section");
      container.appendChild(el);
    }
  });
}
