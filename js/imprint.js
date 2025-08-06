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
  h2.setAttribute("data-i18n", "imprint");
  h2.textContent = getTranslation("imprint", currentLang);
  wrapper.appendChild(h2);

  const sections = [
    { title: "imprint_section1_title", text: "imprint_section1_text" },
    { title: "imprint_section2_title", text: "imprint_section2_text" },
    { title: "imprint_section3_title", text: "imprint_section3_text" },
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
