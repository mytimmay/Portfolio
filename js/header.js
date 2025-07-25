export async function loadHeader(options = {}) {
  const { transparent = false, indexPage = false } = options;
  try {
    const res = await fetch('header.html');
    const html = await res.text();
    const temp = document.createElement('div');
    temp.innerHTML = html.trim();
    const header = temp.firstElementChild;
    if (transparent) header.classList.add('transparent');
    if (indexPage) {
      const brand = header.querySelector('.nav-brand');
      brand?.setAttribute('href', 'index.html#home');
      const projects = header.querySelector('.js-to-projects');
      projects?.removeAttribute('href');
      const contact = header.querySelector('.js-to-contact');
      contact?.removeAttribute('href');
    }
    document.body.prepend(header);
  } catch (err) {
    console.error('Header loading failed', err);
  }
}
