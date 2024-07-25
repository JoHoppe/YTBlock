// Function to update thumbnails
function updateThumbnails() {
    // Get all video elements
    const videos = document.querySelectorAll('ytd-rich-grid-media');

    let thumbChannelMap = [];

    // Iterate over each video to extract data
    videos.forEach(video => {
        // Get the thumbnail image URL
        const thumbnail = video.querySelector('img').src;

        // Get the channel URL
        const channelUrl = video.querySelector('#avatar-container a').href;

        // Add channel-thumbnail object to the array
        thumbChannelMap.push({"Channel": channelUrl, "Thumbnail": thumbnail});
    });

    // Fetch the list of channels from Chrome storage
    chrome.storage.sync.get(['channels'], (result) => {
        // Assume result.channels is an array of channel URLs
        const storedChannels = result.channels || [];

        // New image URL to be used for updating
        const newImageURL = chrome.runtime.getURL('assets/ext-icon.png');

        // Iterate over thumbChannelMap to update thumbnails
        thumbChannelMap.forEach(entry => {
            if (storedChannels.includes(entry.Channel)) {
                console.log(`Updating thumbnail: ${entry.Thumbnail} to ${newImageURL}`);
                entry.Thumbnail = newImageURL;  // Update the thumbnail URL in the array

                // Update the thumbnail in the DOM
                const imgElement = [...document.querySelectorAll('ytd-rich-grid-media')]
                                    .find(video => video.querySelector('#avatar-container a').href === entry.Channel)
                                    .querySelector('img');

                if (imgElement) {
                    imgElement.src = newImageURL;
                }
            }
        });
    });
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'replaceThumbnails') {
        console.log('Received message to replace thumbnails');
        updateThumbnails();
        sendResponse({status: 'thumbnails replaced'});
    }
});

// Send message to background script to replace thumbnails
function sendReplaceThumbnailsMessage() {
    console.log('Sending message to replace thumbnails');
    chrome.runtime.sendMessage({action: 'replaceThumbnails'}, response => {
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

observer.observe(document.body, {childList: true, subtree: true});
