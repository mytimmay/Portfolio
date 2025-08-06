import {
  setLanguage,
  currentLang,
  initLangToggle,
  getTranslation,
  getInitialLanguage,
} from "./i18n.js";
import { initNav } from "./nav.js";
import { initFadeAnimations } from "./animations.js";
import { loadHeader } from "./header.js";
import { loadFooter } from "./footer.js";
import { createTwoColumnSection } from "./layout.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeader();
  await setLanguage(getInitialLanguage());

  initLangToggle();
  initNav();
  renderSections();
  initFadeAnimations();
  await loadFooter();
});

function renderSections() {
  const container = document.querySelector(".smooth-wrapper");
  if (!container) return;

  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "content-wrapper";

  const h2 = document.createElement("h2");
  h2.className = "center";
  h2.setAttribute("data-i18n", "privacypolicy");
  h2.textContent = getTranslation("privacypolicy", currentLang);
  wrapper.appendChild(h2);

  const sections = [
    { title: "privacy_section1_title", text: "privacy_section1_text" },
    { title: "privacy_section2_title", text: "privacy_section2_text" },
    { title: "privacy_section3_title", text: "privacy_section3_text" },
    { title: "privacy_section4_title", text: "privacy_section4_text" },
    { title: "privacy_section5_title", text: "privacy_section5_text" },
    { title: "privacy_section6_title", text: "privacy_section6_text" },
  ];

  sections.forEach((sec) => {
    const p = document.createElement("p");
    p.setAttribute("data-i18n", sec.text);
    const content = getTranslation(sec.text, currentLang);
    if (content.includes("<br>") || content.includes("\n")) {
      p.setAttribute("data-i18n-html", "");
      p.innerHTML = content;
    } else {
      p.textContent = content;
    }

    const el = createTwoColumnSection(sec.title, [p]);
    el.classList.add("dynamic-section");
    wrapper.appendChild(el);
  });

  container.appendChild(wrapper);
}
