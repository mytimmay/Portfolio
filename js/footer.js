import { setLanguage, currentLang } from "./i18n.js";

export async function loadFooter() {
  try {
    const res = await fetch("footer");
    const html = await res.text();
    const temp = document.createElement("div");
    temp.innerHTML = html.trim();
    const footer = temp.firstElementChild;

    const wrapper =
      document.querySelector(".smooth-wrapper") ||
      document.querySelector("main") ||
      document.body;
    wrapper.appendChild(footer);

    await setLanguage(currentLang);
  } catch (err) {
    console.error("Footer loading failed", err);
  }
}
