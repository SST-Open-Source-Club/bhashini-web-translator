import Popup from "./Popup";
import Pop from "./Pop";
import React from "react";
import BhashiniTranslator from "@scaler-school-of-technology/bhashini-web-translator";
const currentScriptSrc = document.currentScript.src.split("?")[0];
const UrlParams = new URLSearchParams(document.currentScript.src.split("?")[1]);
const APiKey = UrlParams.get("BHASHINI_API_KEY");
const UserId = UrlParams.get("BHASHINI_USER_ID");
let autoTranslate = localStorage.getItem("autoTranslate") || false;
let targetLanguage = localStorage.getItem("targetLanguage");
const bhashiniTranslator = new BhashiniTranslator(APiKey, UserId);
// console.log(autoTranslate, typeof autoTranslate);
if (autoTranslate === "true") {
  autoTranslate = true;
} else {
  targetLanguage = "none";
}
// console.log(APiKey, UserId);
function App() {
  return (
    <>
      <Pop
        triggerElement="Click Me"
        children=<Popup
          APIKey={APiKey}
          UserId={UserId}
          auto={autoTranslate}
          targetL={targetLanguage}
          bhashiniTranslator={bhashiniTranslator}
          currentScriptSrc={currentScriptSrc}
        />
        currentScriptSrc={currentScriptSrc}
      />
    </>
  );
}

export default App;
