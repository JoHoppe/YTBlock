document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('add_channel_button');
    const input = document.getElementById("new-blocked-channel-input");
    const blockedChannels = document.getElementById('blocked-select');
    const removeButton = document.getElementById("remove-disabled-channels")


    // Load channels and append to the select element
    loadChannelsAndAppendToSelect();

    // Add event listener to the save button
    saveButton.addEventListener('click', () => {
        const channelUrl = input.value;

        if (isYoutubeChannelUrl(channelUrl)) {
            // Fetch existing channels, add the new one, and save
            chrome.storage.sync.get(['channels'], (result

            ) => {
                let channels = result.channels || [];
                if (!Array.isArray(channels)) {
                    channels = [];
                }
                channels.push(channelUrl);
                chrome.storage.sync.set({channels: channels}, () => {
                    // Append the new channel to the select element
                    let opt = document.createElement("option");
                    opt.value = channelUrl;
                    opt.textContent = channelUrl;
                    blockedChannels.appendChild(opt);

                    alert('Channel saved.');
                });
            });
        } else {
            alert('Input was not a valid Channel URL');
        }
    });

    removeButton.addEventListener('click', () => {
        const channels = Array.from(document.querySelector("select").selectedOptions)
        if (channels.length > 0) {
            channels.forEach(channel => {
                    blockedChannels.removeChild(channel);
                    chrome.storage.sync.set({channels: blockedChannels});
                }
            )
            alert("Channel(s) removed")
        } else {
            alert("No Channel selected")
        }
    })

// Function to check if the URL is a valid YouTube channel URL
    function isYoutubeChannelUrl(url) {
        const youtubeChannelRegex = /^https:\/\/(www\.)?youtube\.com\/(c|channel|user|@)[A-Za-z0-9_-]+$/i;
        return youtubeChannelRegex.test(url);
    }

// Function to load channels from storage and append them to the select element
    async function loadChannelsAndAppendToSelect() {
        await chrome.storage.sync.get(['channels'], (result) => {
            if (result.channels.length > 0) {
                result.channels.forEach(channel => {
                    let opt = document.createElement("option");
                    opt.value = channel;
                    opt.textContent = channel;
                    blockedChannels.appendChild(opt);
                });
            }
        });
    }
})
;
