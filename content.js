chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "scrape") {
        const comments = [];

        document.querySelectorAll("#content-text").forEach(comment => {
            comments.push(comment.innerText);
        });

        chrome.runtime.sendMessage({ action: "commentsScraped", data: comments });

        sendResponse({ success: true });
    }
});
