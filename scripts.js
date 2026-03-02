/**
 * URL Parameter Propagation
 * Captures all current URL parameters and appends them to all external links.
 */
function propagateURLParameters() {
    const currentParams = new URLSearchParams(window.location.search);
    if (currentParams.toString() === "") return;

    const updateLink = (link) => {
        try {
            if (!link.href || link.href.startsWith('#') || link.href.startsWith('javascript:')) return;
            const url = new URL(link.href, window.location.origin);
            const linkParams = new URLSearchParams(url.search);
            currentParams.forEach((value, key) => {
                linkParams.set(key, value);
            });
            url.search = linkParams.toString();
            link.href = url.toString();
        } catch (e) {
            console.warn('Could not propagate parameters to link:', link.href);
        }
    };

    const links = document.querySelectorAll('a[href]');
    links.forEach(updateLink);

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) {
                    if (node.tagName === 'A') updateLink(node);
                    node.querySelectorAll('a[href]').forEach(updateLink);
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
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
    propagateURLParameters();
    startCountdown(30);
});
