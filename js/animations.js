export function initFadeAnimations() {
  const elements = document.querySelectorAll(
    ".fade-left, .fade-right, .fade-top"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  const startObserving = () => {
    elements.forEach((el) => observer.observe(el));
  };

  if (document.readyState === "complete") {
    startObserving();
  } else {
    window.addEventListener("load", startObserving, { once: true });
  }
}
