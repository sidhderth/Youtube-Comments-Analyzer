chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "scrape") {
        // Get the video ID from the current URL
        const videoId = window.location.search.split('v=')[1].split('&')[0];

        // Send the video ID to a local server
        fetch("http://localhost:5000/video_id", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ videoId: videoId }),
        })
        .then(response => response.json())
        .then(data => {
            sendResponse({ success: true }); // Send success response without logging
        })
        .catch(error => {
            sendResponse({ success: false }); // Send failure response without logging
        });

        return true; // Keep the message channel open for sendResponse
    }
});