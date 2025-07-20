export function createTwoColumnSection(leftKey, rightElements, translations, currentLang, rightId) {
  const wrapper = document.createElement('div');
  wrapper.className = 'two-column-list';

  const leftCol = document.createElement('div');
  leftCol.className = 'column-left';

  const headline = document.createElement('h4');
  headline.className = 'fade-left';
  headline.textContent = translations[leftKey]?.[currentLang] || leftKey;
  leftCol.appendChild(headline);

  const rightCol = document.createElement('div');
  rightCol.className = 'column-right';
  if (rightId) {
    rightCol.id = rightId;
  }

  if (Array.isArray(rightElements)) {
    rightElements.forEach(el => rightCol.appendChild(el));
  } else if (rightElements) {
    rightCol.appendChild(rightElements);
  }

  wrapper.append(leftCol, rightCol);
  return wrapper;
}
