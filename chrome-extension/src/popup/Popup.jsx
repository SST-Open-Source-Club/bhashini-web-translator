import { useState, useEffect } from 'react'
import './Popup.css'
import { Tooltip } from 'react-tooltip'

export const Popup = () => {
  const [targetLanguage, setTargetLanguage] = useState('none')
  const [translating, setTranslating] = useState(false)
  const [isDefault, setDefault] = useState(false)
  const [extensionTranslateOptions, setExtensionTranslateOptions] = useState('en')
  const [selectLabel, setSelectLabel] = useState('Select Language')
  const [targetLabel, setTargetLabel] = useState('Translate to : ')
  const [errorMessage, setErrorMessage] = useState('* Please select a target language')
  const [checkBoxText, setCheckBoxText] = useState('Remember language for future use')
  const [translateButtonText, setTranslateButtonText] = useState('Translate')
  const [resetTooltipText, setResetTooltipText] = useState('Reset to default settings')
  const [checkBoxDisabled, setCheckBoxDisabled] = useState(true);

  const handleDefault = (event) => {
    setDefault(event.target.checked)
    chrome.storage.sync.set({ default: event.target.checked }, function () {
      console.log('Value of default is set to ' + event.target.checked)
    })

    if (event.target.checked) {
      chrome.storage.sync.set({ targetLanguage: targetLanguage }, function () {
        console.log('Value of target language is set to ' + targetLanguage)
      })
    }
  }

  useEffect(()=>{
    if(translating){
      setCheckBoxDisabled(true)
    }
    else{
      setCheckBoxDisabled(false)
    }
  },[translating])

  const handleTargetLanguageChange = (event) => {
    setTargetLanguage(event.target.value)
    if(event.target.value !== 'none' && !translating) {
      const errorMessage = document.querySelector('.errorMessage')
      errorMessage.style.display = 'none'
      setCheckBoxDisabled(false);
      if(isDefault){
        chrome.storage.sync.set({ targetLanguage: event.target.value }, function () {
          console.log('Value of target language is set to ' + event.target.value)
        })
      }
    }
    else{
      setCheckBoxDisabled(true);
    }
  }

  const handleTranslateClick = () => {
    const errorMessage = document.querySelector('.errorMessage')
    if (targetLanguage === 'none') {
      errorMessage.style.display = 'flex'
      return
    }
    const targetLanguageButton = document.getElementById('targetLanguage')
    targetLanguageButton.setAttribute('disabled', 'true')

    errorMessage.style.display = 'none'
    setTranslating(true)
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          action: 'translateContent',
          sourceLanguage: 'en',
          targetLanguage: targetLanguage,
        },
        (response) => {
          if (response === 'success') {
            targetLanguageButton.removeAttribute('disabled')
            setTranslating(false)
          } else {
            targetLanguageButton.removeAttribute('disabled')
            setTranslating(false)
          }
        },
      )
    })
  }

  const handleReset = () => {
    if (translating) return
    chrome.storage.sync.set({ default: false }, function () {
      console.log('Value is of default set to ' + false)
    })
    chrome.storage.sync.set({ targetLanguage: 'none' }, function () {
      console.log('Value is target language set to ' + 'none')
    })

    setDefault(false)
    setTargetLanguage('none')
    const errorMessage = document.querySelector('.errorMessage')
    errorMessage.style.display = 'none'
    setExtensionTranslateOptions('en')

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.reload(tabs[0].id)
    })

    setCheckBoxDisabled('true')
    setTranslateButtonText('Translate')
    setCheckBoxText('Remember language for future use')
    setErrorMessage('* Please select a target language')
    setTargetLabel('Translate to : ')
    setSelectLabel('Select Language')
    setResetTooltipText('Reset to default settings')
  }

  useEffect(() => {
    chrome.storage.sync.get(['default'], function (result) {
      if (result.default) {
        setDefault(result.default)
      }
    })

    if (isDefault) {
      chrome.storage.sync.get(['targetLanguage'], function (result) {
        if (result.targetLanguage) {
          setTargetLanguage(result.targetLanguage)
        }
      })      
      handleTranslateClick()
    }
  }, [isDefault, targetLanguage])

  const handleExtensionOptionsChange = (event) => {
    setExtensionTranslateOptions(event.target.value)
    console.log('extensionTranslateOptions', extensionTranslateOptions)
    const globeBtn = document.getElementById('globe-btn')
    globeBtn.style.display = 'block'

    const extOptions = document.getElementById('ext-options')
    extOptions.style.display = 'none'

    const langArray = {
      'none' : 'Select Language',
      'en' : 'Select Language',
      'hi' : 'भाषा चुनें',
      'ta' : 'மொழி தேர்ந்தெடு',
      'te' : 'భాషను ఎంచుకోండి',
      'ml' : 'ഭാഷ തിരഞ്ഞെടുക്കുക',
      'mr' : 'भाषा निवडा',
      'bn' : 'ভাষা নির্বাচন করুন',
      'as' : 'ভাষা নির্বাচন কৰক',
      'gu' : 'ભાષા પસંદ કરો',
      'kn' : 'ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ',
      'or' : 'ଭାଷା ଚୟନ କରନ୍ତୁ',
      'pa' : 'ਭਾਸ਼ਾ ਚੁਣੋ'
    }

    const translateButtonTextArray = {
      'en' : 'Translate',
      'hi' : 'अनुवाद करें',
      'ta' : 'மொழிபெயர்',
      'te' : 'అనువదించు',
      'ml' : 'വിവർത്തനം ചെയ്യുക',
      'mr' : 'भाषांतर करा',
      'bn' : 'অনুবাদ করা',
      'as' : 'অনুবাদ কৰা',
      'gu' : 'અનુવાદ કરો',
      'kn' : 'ಅನುವಾದಿಸು',
      'or' : 'ଅନୁବାଦ କର',
      'pa' : 'ਅਨੁਵਾਦ'
    }

    const checkBoxTextArray = {
      'en' : 'Remember language for future use',
      'hi' : 'भविष्य के लिए भाषा याद रखें',
      'ta' : 'எதிர்காலத்திற்கு மொழி ஞாபகம்',
      'te' : 'భవిష్యత్తుకు భాష గుర్తుంచు',
      'ml' : 'ഭവിഷ്യത്തിനായി ഭാഷ ഓർക്കുക',
      'mr' : 'भविष्यासाठी भाषा लक्षात ठेवा',
      'bn' : 'ভবিষ্যৎ জন্য ভাষা মনে রাখুন',
      'as' : 'ভবিষ্যতৰ বাবে ভাষা মন ধৰি',
      'gu' : 'ભવિષ્ય માટે ભાષા યાદ રાખો',
      'kn' : 'ಭವಿಷ್ಯದ ಬಳಕೆಗಾಗಿ ಭಾಷೆ ನೆನಪಿಗೆ ಇಟ್ಟುಕೊಳ್ಳಿ',
      'or' : 'ଭବିଷ୍ୟତ ପାଇଁ ଭାଷା ମନେ ରଖନ୍ତୁ',
      'pa' : 'ਭਵਿਖ ਲਈ ਭਾਸ਼ਾ ਯਾਦ ਰੱਖੋ'
    }

    const errorMessageArray = {
      'en' : '* Please select a target language',
      'hi' : '* कृपया अनुवाद करने के लिए एक भाषा चुनें',
      'ta' : '* மொழிபெயர்க்க ஒரு மொழியைத் தேர்ந்தெடுக்கவும்',
      'te' : '* దయచేసి అనువదించడానికి ఒక భాషను ఎంచుకోండి',
      'ml' : '* വിവർത്തനം ചെയ്യാൻ ഒരു ഭാഷ തിരഞ്ഞെടുക്കുക',
      'mr' : '* कृपया भाषांतर करण्यासाठी भाषा निवडा',
      'bn' : '* অনুগ্রহ করে অনুবাদ করার জন্য একটি ভাষা নির্বাচন করুন',
      'as' : '* অনুবাদ কৰিবলৈ এটা ভাষা বাছি লওক',
      'gu' : '* કૃપા કરીને અનુવાદ કરવા માટે ભાષા પસંદ કરો',
      'kn' : '* ದಯವಿಟ್ಟು ಅನುವಾದಿಸಲು ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      'or' : '* ଅନୁବାଦ କରିବାକୁ ଏକ ଭାଷା ଚୟନ କରନ୍ତୁ |',
      'pa' : '* ਕਿਰਪਾ ਕਰਕੇ ਅਨੁਵਾਦ ਕਰਨ ਲਈ ਇੱਕ ਭਾਸ਼ਾ ਚੁਣੋ',

    }
    
    const translateToArray = {
      'en' : 'Translate to : ',
      'hi' : 'अनुवाद करने के लिए : ',
      'ta' : 'மொழிபெயர்  : ',
      'te' : 'దీనికి అనువదించు : ',
      'ml' : 'ഇതിലേക്ക് വിവർത്തനം ചെയ്യുക : ',
      'mr' : 'यामध्ये भाषांतर करा : ',
      'bn' : 'এতে অনুবাদ করুন: ',
      'as' : 'অনুবাদ কৰক : ',
      'gu' : 'આમાં અનુવાદ કરો : ',
      'kn' : 'ಇದಕ್ಕೆ ಅನುವಾದಿಸಿ : ',
      'or' : 'କୁ ଅନୁବାଦ କରନ୍ତୁ : ',
      'pa' : 'ਇਸ ਵਿੱਚ ਅਨੁਵਾਦ ਕਰੋ : '
    }

    const resetTooltipArray = {
      'en' : 'Reset to default settings',
      'hi' : 'डिफ़ॉल्ट सेटिंग्स पर रीसेट करें',
      'ta' : 'இயல்பு அமைப்புகளுக்கு மீளமைக்க',
      'te' : 'డిఫాల్ట్ సెట్టింగ్స్ కు రీసెట్ చేయండి',
      'ml' : 'ഡിഫോൾട്ട് ക്രമങ്ങളിലേക്ക് മാറുക',
      'mr' : 'डिफॉल्ट सेटिंग्सवर रीसेट करा',
      'bn' : 'ডিফল্ট সেটিংস পরিবর্তন করুন',
      'as' : 'ডিফল্ট ছেটিংছত পুনৰ স্থাপন কৰক',
      'gu' : 'ડિફૉલ્ટ સેટિંગ્સ પર રીસેટ કરો',
      'kn' : 'ಡಿಫಾಲ್ಟ್ ಸೆಟ್ಟಿಂಗ್ಸ್ ಗೆ ಮರುಹೊಂದಿಸಿ',
      'or' : 'ଡିଫଲ୍ଟ ସେଟିଂରେ ପୁନର୍ ସ୍ଥାପନ କରନ୍ତୁ',
      'pa' : 'ਮੂਲ ਸੈਟਿੰਗਾਂ ਤੇ ਰੀਸੈਟ ਕਰੋ'
    }

    setTranslateButtonText(translateButtonTextArray[event.target.value])
    setCheckBoxText(checkBoxTextArray[event.target.value])
    setErrorMessage(errorMessageArray[event.target.value])
    setSelectLabel(langArray[event.target.value])
    setTargetLabel(translateToArray[event.target.value])
    setResetTooltipText(resetTooltipArray[event.target.value])
  }

  const handleExtTranslate = () => {
    const extOptions = document.getElementById('ext-options')
    extOptions.style.display = 'block'
    const globeBtn = document.getElementById('globe-btn')
    globeBtn.style.display = 'none'
  }

  return (
    <div className="language-select-container">
      <div className="header-extension">
        <img src="img/logo.png" alt="Bhashini" class="logo" />
        <button id="globe-btn" onClick={handleExtTranslate}>
          
        </button>
        <div id="ext-options">
          <label>{targetLabel}</label>
          <select
            id="extensionOptions"
            className="extensionOptions"
            onChange={handleExtensionOptionsChange}
            value={extensionTranslateOptions}
          >
            <option default value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="ta">தமிழ்</option>
            <option value="te">తెలుగు</option>
            <option value="ml">മലയാളം</option>
            <option value="mr">मराठी</option>
            <option value="bn">বাংলা</option>
            <option value="as">অসমীয়া</option>
            <option value="gu">ગુજરાતી</option>
            <option value="kn">ಕನ್ನಡ</option>
            <option value="or">ଓଡିଆ</option>
            <option value="pa">ਪੰਜਾਬੀ</option>
          </select>
        </div>
      </div>
      <div className="selectCtn">
        <label>{targetLabel}</label>
        <select
          id="targetLanguage"
          value={targetLanguage}
          onChange={handleTargetLanguageChange}
          className="translate-to"
        >
          <option value="none">{selectLabel}</option>
          <option value="hi">हिंदी</option>
          <option value="en">English</option>
          <option value="ta">தமிழ்</option>
          <option value="te">తెలుగు</option>
          <option value="ml">മലയാളം</option>
          <option value="mr">मराठी</option>
          <option value="bn">বাংলা</option>
          <option value="as">অসমীয়া</option>
          <option value="gu">ગુજરાતી</option>
          <option value="kn">ಕನ್ನಡ</option>
          <option value="or">ଓଡିଆ</option>
          <option value="pa">ਪੰਜਾਬੀ</option>
        </select>
      </div>
      <div className="errorMessage">
        <span>{errorMessage}</span>
      </div>
      <div className="checkbox-container">
        <label for="saveAsDefault">
          <div>{checkBoxText}</div>
          <input disabled={checkBoxDisabled} type="checkbox" id="saveAsDefault" onChange={handleDefault} checked={isDefault} />
        </label>
      </div>

      <div className="btn-container">
        {!translating ? (
          <button id="translateButton" onClick={handleTranslateClick}>
            {translateButtonText}
          </button>
        ) : (
          <img src="/img/loading.png" alt="translating..." id="loading-img" />
        )}
      </div>

      <div className="footer-cont">
        <footer className="footer-ctn">
          <label className="footer">Developed by</label>
          <img src="img/scaler.png" alt="Bhashini" className="scaler-logo" />
        </footer>
        <div className="reset-ctn">
          <button className="reset-btn" onClick={handleReset}>
            <img
              src="img/reset.png"
              alt="reset"
              data-tooltip-id="reset-tooltip"
              data-tooltip-content={resetTooltipText}
            />
            <Tooltip id="reset-tooltip" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Popup;
