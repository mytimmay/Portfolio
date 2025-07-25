export async function loadFooter() {
  try {
    const res = await fetch('footer.html');
    const html = await res.text();
    const temp = document.createElement('div');
    temp.innerHTML = html.trim();
    const footer = temp.firstElementChild;
    document.body.appendChild(footer);
  } catch (err) {
    console.error('Footer loading failed', err);
  }
}
