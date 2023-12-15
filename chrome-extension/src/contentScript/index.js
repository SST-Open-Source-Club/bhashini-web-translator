import BhashiniTranslator from '@scaler-school-of-technology/bhashini-web-translator'

const Bhashini = new BhashiniTranslator(
  '019a562b7f-bb9c-4440-8b79-11b170353130',
  '48115d2ab7f24c55b8b29af34806050c',
)
chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  if (request.action === 'translateContent') {
    try {
      await Bhashini.translateDOM(document.body, request.sourceLanguage, request.targetLanguage, 22)
    } catch (error) {
      sendResponse({ error: error.message, message: 'failed' })
    } finally {
      sendResponse({ message: 'success' })
    }
  }
})
