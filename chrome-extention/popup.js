document.addEventListener("DOMContentLoaded", function () {
  const sourceLanguageSelect = document.getElementById("sourceLanguage");
  const targetLanguageSelect = document.getElementById("targetLanguage");
  const translateButton = document.getElementById("translateButton");

  translateButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "translateContent",
        sourceLanguage: sourceLanguageSelect.value,
        targetLanguage: targetLanguageSelect.value,
      });
    });
  });
});
