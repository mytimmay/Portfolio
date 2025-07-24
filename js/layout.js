import { currentLang, getTranslation } from "./i18n.js";

export function createTwoColumnSection(leftKey, rightElements, rightId) {
  const wrapper = document.createElement("div");
  wrapper.className = "two-column-list";

  const leftCol = document.createElement("div");
  leftCol.className = "column-left";

  const headline = document.createElement("h4");
  headline.className = "fade-left";
  headline.setAttribute("data-i18n", leftKey);
  headline.textContent = getTranslation(leftKey, currentLang);
  leftCol.appendChild(headline);

  const rightCol = document.createElement("div");
  rightCol.className = "column-right";
  if (rightId) {
    rightCol.id = rightId;
  }

  if (Array.isArray(rightElements)) {
    rightElements.forEach((el) => {
      el.classList.add("fade-right"); // <–– neue Klasse
      rightCol.appendChild(el);
    });
  } else if (rightElements) {
    rightElements.classList.add("fade-right"); // <–– neue Klasse
    rightCol.appendChild(rightElements);
  }

  wrapper.append(leftCol, rightCol);
  return wrapper;
}

export function createDesignProcessSection(designPhases) {
  const wrapper = document.createElement("div");
  wrapper.className = "process";

  const head = document.createElement("h4");
  head.className = "process-head";
  head.setAttribute("data-i18n", "designprocess_title");
  head.textContent = getTranslation("designprocess_title", currentLang);

  wrapper.appendChild(head);

  const listWrapper = document.createElement("div");
  listWrapper.className = "process-lists";

  designPhases.forEach((phase) => {
    const list = document.createElement("div");
    list.className = "process-list";

    const icon = document.createElement("div");
    icon.className = "icon-circle";

    if (phase.image) {
      const img = document.createElement("img");
      img.src = phase.image;
      icon.appendChild(img);
    }

    const h4 = document.createElement("h4");
    h4.setAttribute("data-i18n", phase.title);
    h4.textContent = getTranslation(phase.title, currentLang);

    const items = document.createElement("div");
    items.className = "process-list-items";
    phase.methods.forEach((key) => {
      const entry = document.createElement("div");
      entry.setAttribute("data-i18n", key);
      entry.textContent = getTranslation(key, currentLang);
      items.appendChild(entry);
    });

    list.append(icon, h4, items);
    listWrapper.appendChild(list);
  });

  wrapper.appendChild(listWrapper);
  return wrapper;
}

export function createDetailsSection(sections) {
  const wrapper = document.createElement("div");
  wrapper.className = "details";

  sections.forEach((sec) => {
    const list = document.createElement("div");
    list.className = "details-list";

    const h4 = document.createElement("h4");
    h4.setAttribute("data-i18n", sec.title);
    h4.textContent = getTranslation(sec.title, currentLang);

    const items = document.createElement("div");
    items.className = "details-list-items";
    sec.items.forEach((key) => {
      const span = document.createElement("span");
      span.setAttribute("data-i18n", key);
      const content = getTranslation(key, currentLang);
      if (content.includes("<br>") || content.includes("\n")) {
        span.setAttribute("data-i18n-html", "");
        span.innerHTML = content;
      } else {
        span.textContent = content;
      }
      items.appendChild(span);
    });

    list.append(h4, items);
    wrapper.appendChild(list);
  });

  return wrapper;
}

export function createProcessStep(step) {
  const wrapper = document.createElement("div");
  wrapper.className = "process-step";

  const h1 = document.createElement("h1");
  h1.setAttribute("data-i18n", step.title);
  h1.textContent = getTranslation(step.title, currentLang);

  wrapper.appendChild(h1);

  return wrapper;
}

export function createProjectHeroSection(config) {
  const { className, titleKey, textKey, imageSrc, imageAlt } = config;

  const section = document.createElement("section");
  section.classList.add("hero-project");
  if (className) section.classList.add(className);

  const wrapper = document.createElement("div");
  wrapper.className = "hero-project-wrapper";

  const textWrapper = document.createElement("div");
  textWrapper.className = "hero-project-text-wrapper fade-left";

  const h1 = document.createElement("h1");
  h1.className = "hero-project-heading";
  h1.setAttribute("data-i18n", titleKey);
  h1.textContent = getTranslation(titleKey, currentLang);

  const p = document.createElement("p");
  p.className = "hero-project-text";
  p.setAttribute("data-i18n", textKey);
  p.textContent = getTranslation(textKey, currentLang);

  textWrapper.append(h1, p);

  const imageWrapper = document.createElement("div");
  imageWrapper.className = "hero-project-image fade-right";

  const img = document.createElement("img");
  img.src = imageSrc;
  if (imageAlt) img.alt = imageAlt;
  imageWrapper.appendChild(img);

  wrapper.append(textWrapper, imageWrapper);
  section.appendChild(wrapper);

  return section;
}

export function createMoreProjectsSection(url) {
  const section = document.createElement("section");
  section.classList.add("more-project-links");

  const h2 = document.createElement("h2");
  h2.setAttribute("data-i18n", "more_projects");
  h2.textContent = getTranslation("more_projects", currentLang);

  const wrapper = document.createElement("div");
  wrapper.className = "more-project-links-items";

  url.forEach((li) => {
    const link = document.createElement("a");
    link.className = "links";
    link.href = li.href || "#";
    link.setAttribute("data-i18n", li.title);
    link.textContent = getTranslation(li.title, currentLang);
    wrapper.append(link);
  });

  section.append(h2, wrapper);
  return section;
}
