chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "translateContent") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.executeScript(tabs[0].id, { file: "content.js" });
    });
  }
});
