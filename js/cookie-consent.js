function loadHotjar() {
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:6388039,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('cookieConsent') === 'accepted') {
        loadHotjar();
        return;
    }

    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.innerHTML =
        "Diese Website verwendet Cookies zur Analyse. Durch Klick auf 'Akzeptieren' stimmst du der Nutzung zu. " +
        "<button id='accept-cookies'>Akzeptieren</button>";

    document.body.appendChild(banner);
    banner.style.display = 'block';

    const btn = banner.querySelector('#accept-cookies');
    btn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        banner.remove();
        loadHotjar();
    });
});
