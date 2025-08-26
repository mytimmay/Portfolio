import {
  setLanguage,
  currentLang,
  translations,
  initLangToggle,
  getTranslation,
} from "./i18n.js";
import {
  initNav,
  highlightProjectButtons,
  highlightContactButtons,
} from "./nav.js";
import { initFadeAnimations } from "./animations.js";
import { loadHeader } from "./header.js";
import { loadFooter } from "./footer.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeader({ transparent: true, indexPage: true });
  await setLanguage(localStorage.getItem("lang") || "de");

  initLangToggle();

  initNav(highlightProjectButtons, highlightContactButtons);
  await renderChipsAndProjects();
  initFadeAnimations();
  await loadFooter();
  setupScrollAndNavigation();
  window.history.scrollRestoration = "manual";
  setTimeout(() => window.scrollTo(0, 0), 0);
});

async function renderChipsAndProjects() {
  renderChipsFromI18n({ prefix: "skills", containerId: "skillsContainer" });
  renderChipsFromI18n({ prefix: "tools", containerId: "toolsContainer" });
  await renderProjects();
}

// === Chips ===
function renderChipsFromI18n({ prefix, containerId }) {
  const container = document.getElementById(containerId);
  if (!container || !translations) return;

  container.innerHTML = "";

  const keys = Object.keys(translations)
    .filter((key) => key.startsWith(prefix + "_"))
    .sort((a, b) => parseInt(a.split("_")[1]) - parseInt(b.split("_")[1]));

  const chips = [];

  keys.forEach((key, index) => {
    const value = translations[key];

    const label = getTranslation(key, currentLang);
    const level = typeof value === "object" && value.level ? value.level : 0;

    const chip = document.createElement("div");
    chip.className = "chip";
    chip.style.setProperty("--fill", "0%");

    const span = document.createElement("span");
    span.setAttribute("data-i18n", key);
    span.textContent = label;
    chip.appendChild(span);
    container.appendChild(chip);

    chips.push({ element: chip, level, index });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          chips.forEach(({ element, level, index }) => {
            setTimeout(() => {
              element.style.setProperty("--fill", `${level}%`);
            }, index * 100);
          });
        } else {
          chips.forEach(({ element }) => {
            element.style.setProperty("--fill", "0%");
          });
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(container);
}

// === Projekte ===
async function renderProjects() {
  const container = document.querySelector(".project-cards-grid");
  if (!container) return;

  try {
    const res = await fetch("data/projects.json");
    const projects = await res.json();

    container.innerHTML = "";

    const tagColors = [
      "var(--colors-text-brand-color5)",
      "var(--colors-text-brand-color4)",
      "var(--colors-text-brand-color1)",
      "var(--colors-text-brand-color3)",
      "var(--colors-text-brand-color2)",
      "var(--colors-text-brand-primary)",
    ];

    projects.forEach((proj, index) => {
      const title = getTranslation(proj.titleKey, currentLang);
      const desc = getTranslation(proj.descKey, currentLang);
      const flag = getTranslation(proj.flag, currentLang);
      const buttonLink = getTranslation(proj.btnLink, currentLang);

      const card = document.createElement("a");
      card.className = "project-card";
      card.href = proj.link;

      const imageWrapper = document.createElement("div");
      imageWrapper.className = "project-image";
      if (proj.bgColor) {
        imageWrapper.style.backgroundColor = `var(${proj.bgColor})`;
      }

      const img = document.createElement("img");
      img.src = proj.image;
      img.alt = title;

      imageWrapper.appendChild(img);

      if (proj.flag) {
        const flag = getTranslation(proj.flag, currentLang);

        const type = document.createElement("div");
        type.className = "flag";
        type.setAttribute("data-i18n", proj.flag);
        type.textContent = flag;

        if (proj.bgColor) {
          type.style.color = `var(${proj.bgColor})`;
        }

        imageWrapper.appendChild(type);
      }

      const tagsHTML = (proj.tags || [])
        .map((tag, i) => {
          const color = tagColors[i % tagColors.length];
          return `<span class="project-tag" style="color: ${color}">${tag}</span>`;
        })
        .join("");

      const info = document.createElement("div");
      info.className = "project-info";

      const tagsEl = document.createElement("div");
      tagsEl.className = "project-tags";
      tagsEl.innerHTML = tagsHTML;

      const h3 = document.createElement("h3");
      h3.setAttribute("data-i18n", proj.titleKey);
      h3.textContent = title;

      const p = document.createElement("p");
      p.className = "text-block";
      p.setAttribute("data-i18n", proj.descKey);
      p.textContent = desc;

      const button = document.createElement("button");
      button.className = "project-card-button";
      button.setAttribute("data-i18n", proj.btnLink);
      button.textContent = buttonLink;

      info.append(tagsEl, h3, p);

      card.appendChild(imageWrapper);
      card.appendChild(info);
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Fehler beim Laden der Projekte:", err);
  }
}

// === Scrollverhalten ===
function setupScrollAndNavigation() {
  gsap.registerPlugin(ScrollToPlugin);
  const sections = document.querySelectorAll(".section");
  let currentIndex = 0;
  let isAnimating = false;

  function getScrollContainer(section) {
    return section.querySelector(".scroll-content");
  }

  function scrollToSection(index) {
    if (index < 0 || index >= sections.length || isAnimating) return;
    isAnimating = true;

    const target = sections[index];
    const fromIndex = currentIndex;
    const direction = index > fromIndex ? 1 : -1;

    gsap.to(window, {
      scrollTo: { y: target.offsetTop },
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        currentIndex = index;
        const scrollContainer = getScrollContainer(target);
        if (scrollContainer) {
          if (direction < 0) {
            scrollContainer.scrollTop =
              scrollContainer.scrollHeight - scrollContainer.clientHeight;
          } else {
            scrollContainer.scrollTop = 0;
          }
        }
        isAnimating = false;
        highlightProjectButtons(target.id === "projects-section");
        highlightContactButtons(target.id === "contact");
      },
    });
  }

  window.addEventListener(
    "wheel",
    (e) => {
      if (isAnimating) {
        e.preventDefault();
        return;
      }

      const section = sections[currentIndex];
      const scrollContainer = getScrollContainer(section);
      const deltaY = e.deltaY;

      // ignore tiny wheel values that can occur with touchpads
      if (Math.abs(deltaY) < 1) {
        e.preventDefault();
        return;
      }

      const direction = Math.sign(deltaY);

      if (scrollContainer) {
        const atTop = scrollContainer.scrollTop <= 0;
        const atBottom =
          scrollContainer.scrollTop + scrollContainer.clientHeight >=
          scrollContainer.scrollHeight - 1;
        if ((direction > 0 && !atBottom) || (direction < 0 && !atTop)) {
          e.preventDefault();
          const step = scrollContainer.clientHeight / 4;
          const target =
            direction > 0
              ? Math.min(
                  scrollContainer.scrollTop + step,
                  scrollContainer.scrollHeight - scrollContainer.clientHeight
                )
              : Math.max(scrollContainer.scrollTop - step, 0);
          gsap.to(scrollContainer, {
            scrollTop: target,
            duration: 0.3,
            ease: "power2.out",
          });
          return;
        }
      }

      e.preventDefault();
      scrollToSection(currentIndex + direction);
    },
    { passive: false }
  );

  window.addEventListener("keydown", (e) => {
    if (isAnimating) {
      e.preventDefault();
      return;
    }
    const section = sections[currentIndex];
    const scrollContainer = getScrollContainer(section);

    if (e.key === "PageDown") {
      e.preventDefault();
      if (scrollContainer) {
        const atBottom =
          scrollContainer.scrollTop + scrollContainer.clientHeight >=
          scrollContainer.scrollHeight - 1;
        if (!atBottom) {
          const step = scrollContainer.clientHeight / 4;
          const target = Math.min(
            scrollContainer.scrollTop + step,
            scrollContainer.scrollHeight - scrollContainer.clientHeight
          );
          gsap.to(scrollContainer, {
            scrollTop: target,
            duration: 0.3,
            ease: "power2.out",
          });
          return;
        }
      }
      scrollToSection(currentIndex + 1);
    }

    if (e.key === "PageUp") {
      e.preventDefault();
      if (scrollContainer) {
        const atTop = scrollContainer.scrollTop <= 0;
        if (!atTop) {
          const step = scrollContainer.clientHeight / 4;
          const target = Math.max(scrollContainer.scrollTop - step, 0);
          gsap.to(scrollContainer, {
            scrollTop: target,
            duration: 0.3,
            ease: "power2.out",
          });
          return;
        }
      }
      scrollToSection(currentIndex - 1);
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (scrollContainer) {
        const atBottom =
          scrollContainer.scrollTop + scrollContainer.clientHeight >=
          scrollContainer.scrollHeight - 1;
        if (!atBottom) {
          const step = scrollContainer.clientHeight / 4;
          const target = Math.min(
            scrollContainer.scrollTop + step,
            scrollContainer.scrollHeight - scrollContainer.clientHeight
          );
          gsap.to(scrollContainer, {
            scrollTop: target,
            duration: 0.3,
            ease: "power2.out",
          });
          return;
        }
      }
      scrollToSection(currentIndex + 1);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (scrollContainer) {
        const atTop = scrollContainer.scrollTop <= 0;
        if (!atTop) {
          const step = scrollContainer.clientHeight / 4;
          const target = Math.max(scrollContainer.scrollTop - step, 0);
          gsap.to(scrollContainer, {
            scrollTop: target,
            duration: 0.3,
            ease: "power2.out",
          });
          return;
        }
      }
      scrollToSection(currentIndex - 1);
    }
  });

  let startY = 0;
  let lastY = 0;
  window.addEventListener(
    "touchstart",
    (e) => {
      startY = lastY = e.touches[0].clientY;
    },
    { passive: false }
  );

  window.addEventListener(
    "touchmove",
    (e) => {
      const currentY = e.touches[0].clientY;
      const deltaY = lastY - currentY;
      const section = sections[currentIndex];
      const scrollContainer = getScrollContainer(section);
      if (scrollContainer) {
        const atTop = scrollContainer.scrollTop <= 0;
        const atBottom =
          scrollContainer.scrollTop + scrollContainer.clientHeight >=
          scrollContainer.scrollHeight - 1;

        if ((deltaY > 0 && !atBottom) || (deltaY < 0 && !atTop)) {
          e.preventDefault();
          scrollContainer.scrollTop += deltaY;
        } else {
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
      lastY = currentY;
    },
    { passive: false }
  );

  window.addEventListener(
    "touchend",
    (e) => {
      const dy = startY - e.changedTouches[0].clientY;
      const section = sections[currentIndex];
      const scrollContainer = getScrollContainer(section);
      const atTop = scrollContainer ? scrollContainer.scrollTop <= 0 : true;
      const atBottom = scrollContainer
        ? scrollContainer.scrollTop + scrollContainer.clientHeight >=
          scrollContainer.scrollHeight - 1
        : true;

      if ((dy > 50 && atBottom) || (dy < -50 && atTop)) {
        scrollToSection(currentIndex + (dy > 0 ? 1 : -1));
      }
    },
    { passive: false }
  );

  document.querySelectorAll(".js-to-projects").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.getElementById("projects-section");
      if (!target) return;
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target.offsetTop },
        ease: "power2.inOut",
        onComplete: () => {
          currentIndex = [...sections].findIndex(
            (s) => s.id === "projects-section"
          );
          highlightProjectButtons(true);
          highlightContactButtons(false);
        },
      });
    });
  });

  const hash = window.location.hash.replace("#", "");
  if (hash) {
    const targetId = hash === "contact" ? "contact" : `${hash}-section`;
    const target = document.getElementById(targetId);
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target.offsetTop },
        ease: "power2.inOut",
        onComplete: () => {
          currentIndex = [...sections].findIndex((s) => s.id === targetId);
          highlightProjectButtons(targetId === "projects-section");
          highlightContactButtons(targetId === "contact");
        },
      });
    }
  }

  document.querySelectorAll(".js-to-contact").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.getElementById("contact");
      if (!target) return;
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target.offsetTop },
        ease: "power2.inOut",
        onComplete: () => {
          currentIndex = [...sections].findIndex((s) => s.id === "contact");
          highlightContactButtons(true);
          highlightProjectButtons(false);
        },
      });
    });
  });
}
