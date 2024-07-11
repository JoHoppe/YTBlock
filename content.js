// Function to update thumbnails
function updateThumbnails() {
    // get thumbnail from server
    let newImageURL = chrome.runtime.getURL('assets/ext-icon.png');
    let imgElements = document.getElementsByTagName('img');
    for (let i = 0; i < imgElements.length; i++) {
        if (imgElements[i].src.match('https://i.ytimg.com/(vi|vi_webp)/')) {
            console.log(`Updating thumbnail: ${imgElements[i].src} to ${newImageURL}`);
            imgElements[i].src = newImageURL;
        }
    }
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'replaceThumbnails') {
        console.log('Received message to replace thumbnails');
        updateThumbnails();
        sendResponse({ status: 'thumbnails replaced' });
    }
});

// Send message to background script to replace thumbnails
function sendReplaceThumbnailsMessage() {
    console.log('Sending message to replace thumbnails');
    chrome.runtime.sendMessage({ action: 'replaceThumbnails' }, response => {
        if (response && response.status === 'thumbnails replaced') {
            console.log('Thumbnails have been replaced');
        } else {
            console.log('Failed to replace thumbnails', response);
        }
    });
}

// Detect initial page load
document.addEventListener('DOMContentLoaded', sendReplaceThumbnailsMessage);

// Detect page changes
const observer = new MutationObserver(mutations => {
    sendReplaceThumbnailsMessage();
});

observer.observe(document.body, { childList: true, subtree: true });
