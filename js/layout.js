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

const defaultPhases = [
    {
      title: 'designprocess_title1',
      methods: [
        'designprocess_analyse_method1',
        'designprocess_analyse_method2',
        'designprocess_analyse_method3',
        'designprocess_analyse_method4',
        'designprocess_analyse_method5'
      ]
    },
    {
      title: 'designprocess_title2',
      methods: [
        'designprocess_concept_method1',
        'designprocess_concept_method2',
        'designprocess_concept_method3',
        'designprocess_concept_method4',
        'designprocess_concept_method5'
      ]
    },
    {
      title: 'designprocess_title3',
      methods: [
        'designprocess_design_method1',
        'designprocess_design_method2',
        'designprocess_design_method3',
        'designprocess_design_method4',
        'designprocess_design_method5',
        'designprocess_design_method6',
        'designprocess_design_method7',
        'designprocess_design_method8',
        'designprocess_design_method9'
      ]
    },
    {
      title: 'designprocess_title4',
      methods: ['designprocess_testing_method1']
    }
  ];

export function createDesignProcessSection(translations, currentLang, phases = defaultPhases) {

  const wrapper = document.createElement('div');
  wrapper.className = 'details';

  phases.forEach(phase => {
    const list = document.createElement('div');
    list.className = 'details-list';

    const h4 = document.createElement('h4');
    h4.textContent = translations[phase.title]?.[currentLang] || phase.title;

    const items = document.createElement('div');
    items.className = 'details-list-items';
    phase.methods.forEach(key => {
      const span = document.createElement('span');
      span.textContent = translations[key]?.[currentLang] || key;
      items.appendChild(span);
    });

    list.append(h4, items);
    wrapper.appendChild(list);
  });

  return wrapper;
}

export function createDetailsSection(sections, translations, currentLang) {
  const wrapper = document.createElement('div');
  wrapper.className = 'details';

  sections.forEach(sec => {
    const list = document.createElement('div');
    list.className = 'details-list';

    const h4 = document.createElement('h4');
    h4.textContent = translations[sec.title]?.[currentLang] || sec.title;

    const items = document.createElement('div');
    items.className = 'details-list-items';
    sec.items.forEach(key => {
      const span = document.createElement('span');
      span.textContent = translations[key]?.[currentLang] || key;
      items.appendChild(span);
    });

    list.append(h4, items);
    wrapper.appendChild(list);
  });

  return wrapper;
}
