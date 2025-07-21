export let currentLang = "de";
export let translations = {};

export function getTranslation(key, lang = currentLang) {
  const value = translations[key];
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && value[lang]) return value[lang];
  return key;
}

async function loadTranslations() {
  const response = await fetch("lang/lang.json");
  translations = await response.json();
}

function updateLangButtonUI() {
  document.querySelectorAll(".lang-option").forEach((el) => {
    const lang = el.getAttribute("data-lang");
    el.classList.toggle("active", lang === currentLang);
  });
}

export async function setLanguage(lang) {
  currentLang = lang;
  await loadTranslations();

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const isHTML = el.hasAttribute("data-i18n-html");

    const content = getTranslation(key, lang);

    if (isHTML) {
      el.innerHTML = content;
    } else {
      el.innerText = content;
    }
  });

  localStorage.setItem("lang", lang);
  updateLangButtonUI();
}

export function initLangToggle(callback) {
  document.getElementById("lang-toggle")?.addEventListener("click", async () => {
    const newLang = currentLang === "de" ? "en" : "de";
    await setLanguage(newLang);
    if (typeof callback === "function") callback();
  });
}
