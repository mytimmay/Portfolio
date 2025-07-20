import { setLanguage, currentLang, translations } from "./i18n.js";
import { initNav, highlightProjectButtons } from "./nav.js";
import { initFadeAnimations } from "./animations.js";
import { loadHeader } from "./header.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeader({ transparent: true, indexPage: true });
  await setLanguage(localStorage.getItem("lang") || "de");

  document
    .getElementById("lang-toggle")
    ?.addEventListener("click", async () => {
      const newLang = currentLang === "de" ? "en" : "de";
      await setLanguage(newLang);
      await renderChipsAndProjects(); // Nach Sprachwechsel
      initFadeAnimations();
    });

  initNav(highlightProjectButtons);
  await renderChipsAndProjects();
  initFadeAnimations();
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

    let label = "";
    let level = 0;

    if (typeof value === "string") {
      label = value;
    } else if (typeof value === "object") {
      if (value.label) {
        label =
          typeof value.label === "object"
            ? value.label[currentLang]
            : value.label;
      } else if (value[currentLang]) {
        label = value[currentLang];
      }
      level = value.level ?? 0;
    }

    const chip = document.createElement("div");
    chip.className = "chip";
    chip.style.setProperty("--fill", "0%");

    const span = document.createElement("span");
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
      const title = translations[proj.titleKey]?.[currentLang] || "";
      const desc = translations[proj.descKey]?.[currentLang] || "";

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

      const tagsHTML = (proj.tags || [])
        .map((tag, i) => {
          const color = tagColors[i % tagColors.length];
          return `<span class="project-tag" style="color: ${color}">${tag}</span>`;
        })
        .join("");

      const info = document.createElement("div");
      info.className = "project-info";
      info.innerHTML = `
        <div class="project-tags">${tagsHTML}</div>
        <h3>${title}</h3>
        <p class="text-block">${desc}</p>
      `;

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
    gsap.to(window, {
      scrollTo: { y: target.offsetTop },
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        currentIndex = index;
        const scrollContainer = getScrollContainer(target);
        if (scrollContainer) scrollContainer.scrollTop = 0;
        isAnimating = false;
        highlightProjectButtons(target.id === "projects-section");
      },
    });
  }

  window.addEventListener(
    "wheel",
    (e) => {
      if (isAnimating) return;

      const section = sections[currentIndex];
      const scrollContainer = getScrollContainer(section);
      const deltaY = e.deltaY;

      if (scrollContainer) {
        const atTop = scrollContainer.scrollTop <= 0;
        const atBottom =
          scrollContainer.scrollTop + scrollContainer.clientHeight >=
          scrollContainer.scrollHeight - 1;
        if ((deltaY > 0 && !atBottom) || (deltaY < 0 && !atTop)) return;
      }

      e.preventDefault();
      scrollToSection(currentIndex + (deltaY > 0 ? 1 : -1));
    },
    { passive: false }
  );

  window.addEventListener("keydown", (e) => {
    if (isAnimating) return;
    if (e.key === "ArrowDown") scrollToSection(currentIndex + 1);
    if (e.key === "ArrowUp") scrollToSection(currentIndex - 1);
  });

  let startY = 0;
  window.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY;
  });

  window.addEventListener("touchend", (e) => {
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
  });

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
        },
      });
    });
  });

  const hash = window.location.hash.replace("#", "");
  if (hash) {
    const targetId = `${hash}-section`;
    const target = document.getElementById(targetId);
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target.offsetTop },
        ease: "power2.inOut",
        onComplete: () => {
          currentIndex = [...sections].findIndex((s) => s.id === targetId);
        },
      });
    }
  }

  document.getElementById("toContact")?.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToSection(4);
  });
}
