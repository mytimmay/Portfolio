document.addEventListener("DOMContentLoaded", () => {
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

  // ScrollToPlugin registrieren
  gsap.registerPlugin(ScrollToPlugin);

  const sections = document.querySelectorAll(".section");
  let currentIndex = 0;
  let isAnimating = false;

  // Hilfsfunktion: Prüft ob Section eigenes Scrollverhalten hat
  function isOverflowingSection(section) {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    return (
      (isMobile && section.classList.contains("section-mobile-overflow")) ||
      section.classList.contains("section-overflow")
    );
  }

  // Scroll zu bestimmtem Abschnitt (animiert)
  function scrollToSection(index) {
    if (index < 0 || index >= sections.length || isAnimating) return;

    isAnimating = true;
    gsap.to(document.scrollingElement, {
      scrollTo: { y: sections[index].offsetTop },
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        currentIndex = index;
        isAnimating = false;
      },
    });
  }

  // Wheel-Event
  window.addEventListener(
    "wheel",
    (e) => {
      if (isAnimating) return;

      const currentSection = sections[currentIndex];

      if (isOverflowingSection(currentSection)) {
        const atTop = currentSection.scrollTop === 0;
        const atBottom =
          currentSection.scrollTop + currentSection.clientHeight >=
          currentSection.scrollHeight - 1;

        if (e.deltaY > 0 && atBottom) {
          e.preventDefault();
          scrollToSection(currentIndex + 1);
        } else if (e.deltaY < 0 && atTop) {
          e.preventDefault();
          scrollToSection(currentIndex - 1);
        }
      } else {
        e.preventDefault();
        scrollToSection(currentIndex + (e.deltaY > 0 ? 1 : -1));
      }
    },
    { passive: false }
  );

  // Keyboard
  window.addEventListener("keydown", (e) => {
    if (isAnimating) return;
    if (e.key === "ArrowDown") scrollToSection(currentIndex + 1);
    if (e.key === "ArrowUp") scrollToSection(currentIndex - 1);
  });

  // Touch
  let startY = 0;

  window.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY;
  });

  window.addEventListener("touchend", (e) => {
    const dy = startY - e.changedTouches[0].clientY;
    const currentSection = sections[currentIndex];

    if (isOverflowingSection(currentSection)) {
      const atTop = currentSection.scrollTop === 0;
      const atBottom =
        currentSection.scrollTop + currentSection.clientHeight >=
        currentSection.scrollHeight - 1;

      if (dy > 50 && atBottom) scrollToSection(currentIndex + 1);
      else if (dy < -50 && atTop) scrollToSection(currentIndex - 1);
    } else {
      if (dy > 50) scrollToSection(currentIndex + 1);
      if (dy < -50) scrollToSection(currentIndex - 1);
    }
  });

  // Start bei ganz oben
  window.scrollTo(0, 0);

  // Work Buttons (Index 3)
  document.querySelectorAll(".js-towork").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToSection(3);
    });
  });

  // Contact Button (Index 4)
  const btnContact = document.getElementById("toContact");
  if (btnContact) {
    btnContact.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToSection(4);
    });
  }
});
