document.getElementById('replace-thumbnails').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'replaceThumbnails' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error(`Error: ${chrome.runtime.lastError.message}`);
        } else if (response && response.status === 'thumbnails replaced') {
          console.log('Thumbnails successfully replaced');
        } else {
          console.error('Failed to replace thumbnails');
        }
      });
    }
  });
});
document.getElementById('blur-thumbnails').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'blurThumbnails' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error(`Error: ${chrome.runtime.lastError.message}`);
        } else if (response && response.status === 'thumbnails blurred') {
          console.log('Thumbnails successfully blurred');
        } else {
          console.error('Failed to blur thumbnails');
        }
      });
    }
  });
});
