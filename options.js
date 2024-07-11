document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('save');
    const channelsInput = document.getElementById('blocked-channels');

    // Load saved channels
    chrome.storage.sync.get(['channels'], (result) => {
        if (result.channels) {
            channelsInput.value = result.channels.join(', ');
        }
    });

    function isYoutubeChannelUrl(url) {
        const youtubeChannelRegex = /^https:\/\/(www\.)?youtube\.com\/(channel\/[a-zA-Z0-9_-]+|c\/[a-zA-Z0-9_-]+|user\/[a-zA-Z0-9_-]+)\/?$/;
        return youtubeChannelRegex.test(url);
    }

    saveButton.addEventListener('click', () => {
        const channels = channelsInput.value.split(',').map(channel => channel.trim());
        if (channels.every(channel => isYoutubeChannelUrl(channel))) {
            chrome.storage.sync.set({ channels: channels }, () => {
                alert('Channels saved.');
            });
        } else {
            alert('Input was not a valid Channel URL');
        }
    });
});
