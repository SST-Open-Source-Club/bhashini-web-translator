import BhashiniTranslator from "@scaler-school-of-technology/bhashini-web-translator";

var UrlParams = new URLSearchParams(document.currentScript.src.split("?")[1]);

var USER_ID = UrlParams.get("BHASHINI_USER_ID");
var API_KEY = UrlParams.get("BHASHINI_API_KEY");
var translator = new BhashiniTranslator(API_KEY, USER_ID);

function bhashini_addButton() {
  var button = document.createElement("img");
  button.src =
    "https://github.com/SST-Open-Source-Club/bhashini-web-translator/blob/main/chrome-extension/public/img/logo.png?raw=true";
  button.className = "bhashini-button";
  button.style.zIndex = "9999";
  button.addEventListener("click", function () {
    bhashini_showPopup();
    button.style.display = "none";
  });
  document.body.appendChild(button);
}

function bhashini_addPopup() {
  var popup = document.createElement("div");
  popup.className = "bhashini-popup";
  var container = document.createElement("div");
  container.className = "language-select-container";

  // Create the logo image
  var logo = document.createElement("img");
  logo.src =
    "https://github.com/SST-Open-Source-Club/bhashini-web-translator/blob/main/chrome-extension/public/img/logo.png?raw=true";
  logo.alt = "Bhashini";
  logo.className = "logo";
  container.appendChild(logo);

  // Create the select container for translating to
  var selectCtnTo = document.createElement("div");
  selectCtnTo.className = "selectCtn";
  var labelTo = document.createElement("label");
  labelTo.textContent = "Translate to:";
  selectCtnTo.appendChild(labelTo);
  var selectTo = document.createElement("select");
  selectTo.id = "targetLanguage";
  selectTo.className = "translate-to";
  // Add options to the select element
  var languagesTo = [
    "Hindi",
    "English",
    "Tamil",
    "Telugu",
    "Malayalam",
    "Marathi",
    "Bengali",
    "Assamese",
    "Gujarati",
    "Kannada",
    "Odia",
    "Punjabi",
  ];
  var valueTo = [
    "hi",
    "en",
    "ta",
    "te",
    "ml",
    "mr",
    "bn",
    "as",
    "gu",
    "kn",
    "or",
    "pa",
  ];
  for (var j = 0; j < languagesTo.length; j++) {
    var optionTo = document.createElement("option");
    optionTo.value = valueTo[j];
    optionTo.textContent = languagesTo[j];
    selectTo.appendChild(optionTo);
  }
  selectCtnTo.appendChild(selectTo);
  container.appendChild(selectCtnTo);

  // Create the button container
  var btnContainer = document.createElement("div");
  btnContainer.className = "btn-container";
  var translateButton = document.createElement("button");
  translateButton.id = "translateButton";
  translateButton.textContent = "Translate";
  translateButton.addEventListener("click", () => {
    // Replace button with loading image
    var loadingImg = document.createElement("img");
    loadingImg.src =
      "https://github.com/SST-Open-Source-Club/bhashini-web-translator/blob/main/chrome-extension/public/img/loading.png?raw=true";
    loadingImg.alt = "translating...";
    loadingImg.id = "loading-img";
    btnContainer.replaceChild(loadingImg, translateButton);

    // Perform translation

    translateDom({ msg: "success" }).then((res) => {
      console.log(res);

      // Replace loading image with button
      btnContainer.replaceChild(translateButton, loadingImg);
      popup.style.display = "none";
      var button = document.querySelector(".bhashini-button");
      button.style.display = "block";
    });
  });
  btnContainer.appendChild(translateButton);
  container.appendChild(btnContainer);

  // Create the footer container
  var footerCont = document.createElement("div");
  footerCont.className = "footer-cont";
  var footer = document.createElement("footer");
  footer.className = "footer-ctn";
  var footerLabel = document.createElement("label");
  footerLabel.className = "footer";
  footerLabel.textContent = "Developed by";
  footer.appendChild(footerLabel);
  var scalerLogo = document.createElement("img");
  scalerLogo.src =
    "https://raw.githubusercontent.com/SST-Open-Source-Club/bhashini-web-translator/e51036efbebb2f43756262ad0baf301e8c369de4/chrome-extension/public/img/scaler.png";
  scalerLogo.alt = "Bhashini";
  scalerLogo.className = "scaler-logo";
  footer.appendChild(scalerLogo);
  footerCont.appendChild(footer);
  container.appendChild(footerCont);

  // Append the container to the body or any other desired parent element
  popup.appendChild(container);
  popup.style.display = "none";
  document.body.appendChild(popup);
}
function bhashini_showPopup() {
  var popup = document.querySelector(".bhashini-popup");
  popup.style.display = "block";
}

function bhashini_injectStyles() {
  var styleElement = document.createElement("style");
  var cssCode = `
    /* Optional CSS styles for the button */
    .bhashini-button {
      hieight: 70px;
      width: 70px;
      padding: 10px 20px;
      color: white;
      border: none;
      border-radius: 100%;
      cursor: pointer;
      position: fixed;
      bottom: 20px;
      right: 20px; 
    }

    .bhashini-button :hover {
      background-color: rgb(0,0,0,0.5);
      background-blend-mode: multiply;
    }

    .bhashini-popup {
      width: 300px;
      padding: 10px 20px;
      background-color: grey;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      position: fixed;
      bottom: 10px;
      right: 10px;
    }
    .bhashini-popup .language-select-container {
      padding: 5px;
      background-color: #fff;
      margin: 0px;
      border-radius: 5px;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease-in-out;
      width: 280px;
      height: fit-content;
      display: flex;
      flex-direction: column;
    }
    
    .bhashini-popup .selectCtn {
      width: 224px;
      align-self: center;
    }
    
    .bhashini-popup .language-select-container select {
      height: fit-content;
      width: 224px;
      margin-top: 20px;
      box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
      appearance: none; /* Remove default arrow in some browsers */
      background-image: url('https://github.com/SST-Open-Source-Club/bhashini-web-translator/blob/main/chrome-extension/public/img/down.png?raw=true'); /* Add another icon with linear gradient */
      background-size:
        24px 24px,
        100% 100%;
      background-position:
        right 8px center,
        right -15px center;
      background-repeat: no-repeat, no-repeat;
    }
    .bhashini-popup .logo {
      width: 86px;
      height: 79px;
      flex-shrink: 0;
      align-self: flex-start; /* Align to the top */
    }
    .bhashini-popup .translate-from {
      margin: 1;
      width: 224px;
      height: 56px;
      flex-shrink: 0;
    }
    .bhashini-popup .translate-to {
      width: 224px;
      height: 55px;
      flex-shrink: 0;
    }
    
    .bhashini-popup .footer-cont {
      display: flex;
      align-items: end;
      justify-content: start;
    }
    
    .bhashini-popup .footer {
      width: 70px;
      /* aspect-ratio: 1; */
      /* flex-shrink: 0; */
      color: #4b4b4b;
    
      font-family: Inter;
      font-size: 8px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    
    .bhashini-popup .btn-container {
      padding-top: 20px;
      height: 24px;
      display: flex;
      justify-content: center;
    }
    .bhashini-popup .scaler-logo {
      width: 64px;
      height: auto;
      flex-shrink: 0;
    }
    
    .bhashini-popup .language-select-container h1 {
      text-align: center;
      color: #333;
      font-weight: 300;
    }
    
    .bhashini-popup .language-select-container label {
      display: block;
      margin-top: 20px;
    }
    
    .bhashini-popup .language-select-container select {
      appearance: none;
      width: 100%;
      padding: 10px;
      margin-top: 5px;
      border: 1px solid #e7e7e7;
      border-radius: 0px;
    }
    
    .bhashini-popup .language-select-container button {
      margin-top: 15px;
      width: 122px;
      height: 30px;
      flex-shrink: 0;
      border: 1px solid rgba(67, 101, 190, 0.5);
      background: #113caf;
      color: #fff;
      text-align: center;
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      align-self: center;
      cursor: pointer;
      transition: background-color 0.3s ease-in-out;
    }
    
    .bhashini-popup .language-select-container button:hover {
      background-color: #113baf9a;
    }
    .bhashini-popup .language-select-container button:disabled {
      background-color: #979797;
    }
    .bhashini-popup .footer-ctn {
      margin-top: 16px;
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: start;
    }
    
    .bhashini-popup label {
      color: #5a5a5a;
      font-size: 12px;
      font-weight: bolder;
      line-height: normal;
    }
    .bhashini-popup #loading-img{
      height: 30px;
      width: 30px;
      transform: rotate(0deg);
    
      animation: rotateAnimation 2s linear infinite;
    }
    
    
    @keyframes rotateAnimation {
      to {
        transform: rotate(360deg);
      }
    }
  `;
  styleElement.appendChild(document.createTextNode(cssCode));
  document.head.appendChild(styleElement);
}

const translateDom = async (request) => {
  const res = await translator.translateDOM(
    document.body,
    "en",
    targetLanguage.value,
    22
  );
  // const res = "ggg";
  if (res) {
    console.log("Response from async func");
    return "success";
    // sendResponse({msg:"success"});
  } else {
    return "error";
    // sendResponse({msg:"error"});
  }
};

bhashini_injectStyles();
bhashini_addButton();
bhashini_addPopup();
