export function initNav(onProjectsVisible) {
  const burger = document.getElementById("burger-toggle");
  const navMenu = document.getElementById("nav-menu");
  const header = document.querySelector("header");

  if (!burger || !navMenu || !header) return;

  burger.innerHTML = "&#9776;";
  burger.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    burger.classList.toggle("active");
    burger.innerHTML = isOpen ? "&#10005;" : "&#9776;";
    header.classList.toggle("nav-open", isOpen);
  });

  const allSections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target);

      const isInTopSections =
        visible.includes(allSections[0]) || visible.includes(allSections[1]);

      if (isInTopSections) {
        header.classList.add("transparent");
        header.classList.remove("visible");
      } else {
        header.classList.remove("transparent");
        header.classList.add("visible");
      }

      if (onProjectsVisible) {
        onProjectsVisible(visible.some((el) => el.id === "projects-section"));
      }
    },
    { threshold: 0.5 }
  );

  allSections.forEach((section) => observer.observe(section));
}

export function highlightProjectButtons(active) {
  document.querySelectorAll(".js-to-projects").forEach((btn) => {
    btn.classList.toggle("active", active);
  });
}
