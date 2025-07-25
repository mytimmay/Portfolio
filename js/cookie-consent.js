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
    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'accepted') {
        loadHotjar();
        return;
    }
    if (consent === 'declined') {
        return;
    }

    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.innerHTML =
        "Diese Website verwendet Cookies zur Analyse. Durch Klick auf 'Akzeptieren' stimmst du der Nutzung zu." +
        "<div class='cookie-buttons'>" +
        "<button id='accept-cookies'>Akzeptieren</button>" +
        "<button id='decline-cookies'>Ablehnen</button>" +
        "</div>";

    document.body.appendChild(banner);
    banner.style.display = 'block';

    const acceptBtn = banner.querySelector('#accept-cookies');
    const declineBtn = banner.querySelector('#decline-cookies');
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        banner.remove();
        loadHotjar();
    });

    declineBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        banner.remove();
    });
});
