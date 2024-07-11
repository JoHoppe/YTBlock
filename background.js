chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("youtube.com/watch")) {
        const queryParameters = tab.url.split("?")[1];
        const urlParameters = new URLSearchParams(queryParameters);

        chrome.tabs.sendMessage(tabId, {
            type: "NEW",
            videoId: urlParameters.get("v"),
        });
    }
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'replaceThumbnails') {
        chrome.tabs.sendMessage(sender.tab.id, { action: 'replaceThumbnails' }, response => {
            sendResponse(response);
        });
        return true; // Keeps the message channel open for sendResponse
    }
});
