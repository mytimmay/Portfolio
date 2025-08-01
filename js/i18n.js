export let currentLang = "de";
export let translations = {};
let translationsPromise;

export function getTranslation(key, lang = currentLang) {
  const value = translations[key];
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    if (value[lang]) return value[lang];
    if (value.label) {
      const label = value.label;
      if (typeof label === "string") return label;
      if (label && typeof label === "object" && label[lang]) return label[lang];
    }
  }
  return key;
}

async function loadTranslations() {
  if (translationsPromise) return translationsPromise;
  translationsPromise = fetch("lang/lang.json")
    .then((response) => response.json())
    .then((json) => {
      translations = json;
      return translations;
    });
  return translationsPromise;
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
    const attr = el.getAttribute("data-i18n-attr");

    const content = getTranslation(key, lang);

    if (attr) {
      el.setAttribute(attr, content);
      if (!isHTML) return; // skip content update if only attribute is translated
    }

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
