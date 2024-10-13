(function() {
    'use strict';

    const exampleValue = {
        positive: 70, // Positive percentage
        negative: 30  // Negative percentage
    };

    function insertBar() {
        if (document.getElementById('yt-overlay-bar')) return;

        const Container = document.createElement('div');
        Container.id = 'yt-overlay-bar';
        Container.style.position = 'fixed';
        Container.style.top = '5%';
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
        leftLabel.textContent = `${exampleValue.positive}%`;
        leftLabel.style.fontSize = '2vh';

        const rightLabel = document.createElement('span');
        rightLabel.textContent = `${exampleValue.negative}%`;
        rightLabel.style.fontSize = '2vh';

        const barContainer = document.createElement('div');
        barContainer.style.width = '100%';
        barContainer.style.height = '100%';
        barContainer.style.borderRadius = '2vh';
        barContainer.style.overflow = 'hidden';
        barContainer.style.display = 'flex';

        const positiveBar = document.createElement('div');
        positiveBar.style.height = '100%';
        positiveBar.style.background = 'rgb(0, 255, 0)';
        positiveBar.style.width = `${exampleValue.positive}%`;

        const negativeBar = document.createElement('div');
        negativeBar.style.height = '100%';
        negativeBar.style.background = 'rgb(255, 0, 0)';
        negativeBar.style.width = `${exampleValue.negative}%`;

        barContainer.appendChild(positiveBar);
        barContainer.appendChild(negativeBar);

        Container.appendChild(leftLabel);
        Container.appendChild(barContainer);
        Container.appendChild(rightLabel);

        document.body.appendChild(Container);

        setInterval(() => {
            if (window.externalBarValue !== undefined) {
                const positiveRatio = window.externalBarValue.positive;
                const negativeRatio = window.externalBarValue.negative;

                positiveBar.style.width = `${positiveRatio}%`;
                negativeBar.style.width = `${negativeRatio}%`;

                leftLabel.textContent = `${positiveRatio}%`;
                rightLabel.textContent = `${negativeRatio}%`;
            }
        }, 100);

        document.addEventListener('fullscreenchange', toggleBarVisibility);
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
