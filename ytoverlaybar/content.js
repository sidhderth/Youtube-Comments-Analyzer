(function() {
    'use strict';

    // Hardcoded value (0 or 4)
    const hardcodedValue = 4; // Change this to 0 or 4 as needed

    function insertBar() {
        if (document.getElementById('yt-overlay-bar')) return;

        const Container = document.createElement('div');
        Container.id = 'yt-overlay-bar';
        Container.style.position = 'fixed';
        Container.style.top = '8.2vh';
        Container.style.height = '1vh';
        Container.style.right = '12vw';
        Container.style.width = '10vw';
        Container.style.zIndex = '9999';
        Container.style.pointerEvents = 'none';
        Container.style.borderRadius = '2vh';
        Container.style.background = '#ccc';
        Container.style.boxShadow = '0px 0px 1vh rgba(0,0,0,0.5)';
        Container.style.display = 'flex';
        Container.style.alignItems = 'center';
        Container.style.justifyContent = 'space-between';
        Container.style.padding = '1.6vh';

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
        bar.style.background = getBarColor(hardcodedValue); // Use the hardcoded value

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
        // Return red for 0 and green for 4
        return value === 0 ? 'rgb(255, 0, 0)' : 'rgb(0, 255, 0)'; // Red for 0, Green for 4
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