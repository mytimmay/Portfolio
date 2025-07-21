export function loadHeroProject({ titleKey, textKey, imageSrc, alt, projectClass = '' }) {
  const main = document.querySelector('main');
  if (!main) return;

  const section = document.createElement('section');
  section.className = `hero-project ${projectClass}`.trim();

  const wrapper = document.createElement('div');
  wrapper.className = 'hero-project-wrapper';

  const textWrapper = document.createElement('div');
  textWrapper.className = 'hero-project-text-wrapper fade-left';

  const heading = document.createElement('h1');
  heading.className = 'hero-project-heading';
  heading.setAttribute('data-i18n', titleKey);

  const paragraph = document.createElement('p');
  paragraph.className = 'hero-project-text';
  paragraph.setAttribute('data-i18n', textKey);

  textWrapper.append(heading, paragraph);

  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'hero-project-image fade-right';

  const img = document.createElement('img');
  img.src = imageSrc;
  img.alt = alt;

  imageWrapper.appendChild(img);

  wrapper.append(textWrapper, imageWrapper);
  section.appendChild(wrapper);

  main.appendChild(section);
}
