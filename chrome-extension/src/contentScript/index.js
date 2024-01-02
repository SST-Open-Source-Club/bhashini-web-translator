import BhashiniTranslator from '@scaler-school-of-technology/bhashini-web-translator'

const apiKey = import.meta.env.VITE_API_KEY
const userId = import.meta.env.VITE_USER_ID

const Bhashini = new BhashiniTranslator(apiKey, userId)

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'translateContent') {
    translateDom(request).then(sendResponse)
    return true
  }
})

const translateDom = async (request) => {
  const res = await Bhashini.translateDOM(
    document.body,
    request.sourceLanguage,
    request.targetLanguage,
    22,
  )

  if (res) {
    console.log('Response from async func')
    return 'success'
  } else {
    return 'error'
  }
}
