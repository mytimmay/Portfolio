import { getTranslation } from "./i18n.js";

export function createTwoColumnSection(
  leftKey,
  rightElements,
  translations,
  currentLang,
  rightId
) {
  const wrapper = document.createElement("div");
  wrapper.className = "two-column-list";

  const leftCol = document.createElement("div");
  leftCol.className = "column-left";

  const headline = document.createElement("h4");
  headline.className = "fade-left";
  headline.textContent = getTranslation(leftKey, currentLang);
  leftCol.appendChild(headline);

  const rightCol = document.createElement("div");
  rightCol.className = "column-right";
  if (rightId) {
    rightCol.id = rightId;
  }

  if (Array.isArray(rightElements)) {
    rightElements.forEach((el) => rightCol.appendChild(el));
  } else if (rightElements) {
    rightCol.appendChild(rightElements);
  }

  wrapper.append(leftCol, rightCol);
  return wrapper;
}

export function createDesignProcessSection(
  designPhases,
  translations,
  currentLang
) {
  const wrapper = document.createElement("div");
  wrapper.className = "details";

  designPhases.forEach((phase) => {
    const list = document.createElement("div");
    list.className = "details-list";

    const icon = document.createElement("div");
    icon.className = "icon-circle";

    const fonticon = document.createElement("div");
    fonticon.className = "font-icon";

    const h4 = document.createElement("h4");
    h4.textContent = getTranslation(phase.title, currentLang);

    const items = document.createElement("div");
    items.className = "details-list-items";
    phase.methods.forEach((key) => {
      const span = document.createElement("span");
      span.textContent = getTranslation(key, currentLang);
      items.appendChild(span);
    });

    icon.appendChild(fonticon);
    list.append(icon, h4, items);
    wrapper.appendChild(list);
  });

  return wrapper;
}

export function createDetailsSection(sections, translations, currentLang) {
  const wrapper = document.createElement("div");
  wrapper.className = "details";

  sections.forEach((sec) => {
    const list = document.createElement("div");
    list.className = "details-list";

    const h4 = document.createElement("h4");
    h4.textContent = getTranslation(sec.title, currentLang);

    const items = document.createElement("div");
    items.className = "details-list-items";
    sec.items.forEach((key) => {
      const span = document.createElement("span");
      span.textContent = getTranslation(key, currentLang);
      items.appendChild(span);
    });

    list.append(h4, items);
    wrapper.appendChild(list);
  });

  return wrapper;
}
