// 1. UTM Propagation Logic
function appendUTMsToLinks() {
    const urlParams = new URLSearchParams(window.location.search);
    const utms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'src'];
    
    let paramsToAppend = new URLSearchParams();
    utms.forEach(param => {
        if (urlParams.has(param)) {
            paramsToAppend.append(param, urlParams.get(param));
        }
    });

    if (paramsToAppend.toString()) {
        const links = document.querySelectorAll('a[href*="#oferta"], a[href*="checkout"], a[href*="kiwify"], a[href*="pay"]');
        links.forEach(link => {
            let url = new URL(link.href);
            paramsToAppend.forEach((value, key) => {
                url.searchParams.set(key, value);
            });
            link.href = url.toString();
        });
    }
}

// 2. Countdown Timer Logic
function startCountdown(durationMinutes) {
    let timer = durationMinutes * 60;
    const display = document.querySelector('#countdown');

    setInterval(() => {
        let minutes = parseInt(timer / 60, 10);
        let seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        if (display) display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = durationMinutes * 60; // Reset
        }
    }, 1000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    appendUTMsToLinks();
    startCountdown(30);
});
