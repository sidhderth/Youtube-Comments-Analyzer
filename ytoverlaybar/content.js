(function() {
    'use strict';

    function insertBar() {
        if (document.getElementById('yt-overlay-bar')) return;

        const Container = document.createElement('div');
        Container.id = 'yt-overlay-bar';
        Container.style.position = 'fixed';
        Container.style.top = '2vh';
        Container.style.height = '1vh';
        Container.style.right = '15vw';
        Container.style.width = '10vw';
        Container.style.zIndex = '9999';
        Container.style.pointerEvents = 'none';
        Container.style.borderRadius = '2vh';
        Container.style.background = '#ccc';
        Container.style.boxShadow = '0px 0px 1vh rgba(0,0,0,0.5)';
        Container.style.display = 'flex';
        Container.style.alignItems = 'center';
        Container.style.justifyContent = 'space-between';
        Container.style.padding = '2vh';

        const leftLabel = document.createElement('span');
        leftLabel.textContent = '0';
        leftLabel.style.fontSize = '2vh';

        const rightLabel = document.createElement('span');
        rightLabel.textContent = '4';
        rightLabel.style.fontSize = '2vh';

        const bar = document.createElement('div');
        bar.style.width = '100%';
        bar.style.height = '100%';
        bar.style.borderRadius = '2vh';
        bar.style.background = getBarColor(2);

        Container.appendChild(leftLabel);
        Container.appendChild(bar);
        Container.appendChild(rightLabel);

        document.body.appendChild(Container);

        setInterval(() => {
            if (window.externalBarValue !== undefined) {
                bar.style.background = getBarColor(window.externalBarValue);
            }
        }, 100);

        document.addEventListener('fullscreenchange', toggleBarVisibility);
    }

    function getBarColor(value) {
        const normalized = value / 4;
        const r = normalized < 0.5 ? 255 : Math.round(255 - (normalized - 0.5) * 2 * 255);
        const g = normalized > 0.5 ? 255 : Math.round(normalized * 2 * 255);
        return `rgb(${r}, ${g}, 0)`;
    }

    function toggleBarVisibility() {
        const bar = document.getElementById('yt-overlay-bar');
        if (!bar) return;

        if (document.fullscreenElement) {
            bar.style.display = 'none';
        } else {
            bar.style.display = 'flex';
        }
    }

    insertBar();
})();
