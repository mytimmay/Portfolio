let currentLang = 'de';
let translations = {};

async function loadTranslations() {
  const response = await fetch('lang/lang.json');
  translations = await response.json();
}

async function setLanguage(lang) {
  currentLang = lang;

  if (!translations || Object.keys(translations).length === 0) {
    await loadTranslations();
  }

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key] && translations[key][lang]) {
      el.innerText = translations[key][lang];
    }
  });

  localStorage.setItem('lang', lang);

  // Aktiviere visuell den aktuellen Sprachabschnitt
  updateLangButtonUI();
}

function updateLangButtonUI() {
  document.querySelectorAll('.lang-option').forEach(el => {
    const lang = el.getAttribute('data-lang');
    if (lang === currentLang) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

window.addEventListener('DOMContentLoaded', async () => {
  const savedLang = localStorage.getItem('lang') || navigator.language.slice(0, 2);
  await setLanguage(savedLang === 'en' ? 'en' : 'de');

  const langToggleBtn = document.getElementById("lang-toggle");
  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", async () => {
      const newLang = currentLang === 'de' ? 'en' : 'de';
      await setLanguage(newLang);
    });
  }
});