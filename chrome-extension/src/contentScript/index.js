import BhashiniTranslator from '@scaler-school-of-technology/bhashini-web-translator'

const Bhashini = new BhashiniTranslator(
  '019a562b7f-bb9c-4440-8b79-11b170353130',
  '48115d2ab7f24c55b8b29af34806050c',
)

chrome.runtime.onMessage.addListener( function (request, sender, sendResponse) {
  if (request.action === 'translateContent') {
    translateDom(request).then(
      (res)=>{
        if(res){
          sendResponse(res);
        }else{
          sendResponse({msg:"error"})
        }
      }
    );
    return true;
  }
})

const translateDom = async (request) => {
  const res = await Bhashini.translateDOM(document.body,request.sourceLanguage,request.targetLanguage,22);

  if(res){
    console.log("Response from async func")
    return "success";
    // sendResponse({msg:"success"});
  }else{
    return "error";
    // sendResponse({msg:"error"});
  }
}
