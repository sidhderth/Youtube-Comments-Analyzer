document.getElementById("analyzebtn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "scrape" }, (response) => {
            if (response && response.success) {
                console.log("Scraping started successfully.");
            } else {
                console.log("Failed to start scraping.");
            }
        });
    });
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "commentsScraped") {
        displayComments(request.data);
    }
});

function displayComments(comments) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = '';

    comments.forEach(comment => {
        const commentElement = document.createElement("p");
        commentElement.textContent = comment;
        resultDiv.appendChild(commentElement);
    });
}
