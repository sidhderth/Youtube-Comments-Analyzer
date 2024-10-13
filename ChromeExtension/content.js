console.log("Content script loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "scrape") {
        // Get the video ID from the current URL
        const videoId = window.location.search.split('v=')[1].split('&')[0];

        chrome.runtime.sendMessage({ action: "videoIdScraped", data: videoId });

        sendResponse({ success: true });
    }
});