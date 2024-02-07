chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    chrome.storage.sync.get(['default'], function (result) {
      if (result.default) {
        chrome.storage.sync.get(['targetLanguage'], function (result) {
          if (result.targetLanguage) {
            chrome.tabs.sendMessage(tabId, {
              action: 'translateContent',
              sourceLanguage: 'en',
              targetLanguage: result.targetLanguage,
            })
          }
        })
      }
    })
  }
})
