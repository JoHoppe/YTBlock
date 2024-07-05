chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'replaceThumbnails') {
    const thumbnailLinks = document.querySelectorAll('a#thumbnail.yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail');

    thumbnailLinks.forEach(thumbnailLink => {
      const imgElement = thumbnailLink.querySelector('yt-image img.yt-core-image');
      if (imgElement) {
        imgElement.blur()
        // imgElement.src = 'https://example.com/new-thumbnail.jpg'; // Replace with the actual new thumbnail URL
      }
    });

    sendResponse({status: 'thumbnails replaced'});
  }
});
console.log('Content script loaded');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request);
  if (request.action === 'replaceThumbnails') {
    const thumbnailLinks = document.querySelectorAll('a#thumbnail.yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail');

    thumbnailLinks.forEach(thumbnailLink => {
      const imgElement = thumbnailLink.querySelector('yt-image img.yt-core-image');
      if (imgElement) {
        imgElement.src = 'https://example.com/new-thumbnail.jpg'; // Replace with the actual new thumbnail URL
      }
    });

    sendResponse({status: 'thumbnails replaced'});
  }
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'blurThumbnails') {
    const thumbnailLinks = document.querySelectorAll('a#thumbnail.yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail');

    thumbnailLinks.forEach(thumbnailLink => {
      const imgElement = thumbnailLink.querySelector('yt-image img.yt-core-image');
      if (imgElement) {
        imgElement.style.filter = 'blur(10px)'; // Adjust the blur amount as needed
      }
    });

    sendResponse({status: 'thumbnails blurred'});
  }
});
chrome.storage.sync.get(['channels'], (result) => {
  const channelsToBlur = result.channels || [];

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'blurThumbnails') {
      const thumbnailLinks = document.querySelectorAll('a#thumbnail.yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail');

      thumbnailLinks.forEach(thumbnailLink => {
        const channelElement = thumbnailLink.closest('ytd-channel-name');
        if (channelElement) {
          const channelName = channelElement.innerText.trim();
          if (channelsToBlur.includes(channelName)) {
            const imgElement = thumbnailLink.querySelector('yt-image img.yt-core-image');
            if (imgElement) {
              imgElement.style.filter = 'blur(5px)'; // Adjust the blur amount as needed
            }
          }
        }
      });

      sendResponse({status: 'thumbnails blurred'});
    }
  });
});