document.getElementById("analyzebtn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "scrape" }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error("Error sending message: ", chrome.runtime.lastError.message);
                } else if (response && response.success) {
                    console.log("Scraping started successfully.");
                } else {
                    console.log("Failed to start scraping.");
                }
            });
        } else {
            console.log("No active tab found.");
        }
    });
});

// Listener to receive the video ID from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "videoIdScraped") {
        displayVideoId(request.data);
    }
});

// Function to display the video ID
function displayVideoId(videoId) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = ''; // Clear previous results

    const videoIdElement = document.createElement("p");
    videoIdElement.textContent = `Video ID: ${videoId}`; // Show video ID
    resultDiv.appendChild(videoIdElement);
};