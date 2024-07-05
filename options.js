document.addEventListener('DOMContentLoaded', () => {
  const saveButton = document.getElementById('save');
  const channelsInput = document.getElementById('channels');

  // Load saved channels
  chrome.storage.sync.get(['channels'], (result) => {
    if (result.channels) {
      channelsInput.value = result.channels.join(', ');
    }
  });

  // Save channels
  saveButton.addEventListener('click', () => {
    const channels = channelsInput.value.split(',').map(channel => channel.trim());
    chrome.storage.sync.set({ channels }, () => {
      alert('Channels saved.');
    });
  });
});
