import { useState } from 'react'

import './Popup.css'

export const Popup = () => {
  const [sourceLanguage, setSourceLanguage] = useState('en')
  const [targetLanguage, setTargetLanguage] = useState('hi')

  const [translating, setTransalting] = useState(false)

  const handleSourceLanguageChange = (event) => {
    console.log(event.target.value)
    setSourceLanguage(event.target.value)
  }

  const handleTargetLanguageChange = (event) => {
    setTargetLanguage(event.target.value)
  }

  const handleTranslateClick = () => {
    setTransalting(true)
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          action: 'translateContent',
          sourceLanguage: sourceLanguage,
          targetLanguage: targetLanguage,
        },
        (response) => {
          if(response){
            console.log(response);
            setTransalting(false)
          }
        else{
          console.log("error");
        }
       
        },
      )
    })
  }

  return (
    <div className="language-select-container">
      <img src="img/logo.png" alt="Bhashini" class="logo" />

      <div className="selectCtn">
        <label>Translate from:</label>
        <select
          id="sourceLanguage"
          value={sourceLanguage}
          onChange={handleSourceLanguageChange}
          className="translate-from"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="ta">Tamil</option>
          <option value="te">Telugu</option>
          <option value="ml">Malayalam</option>
          <option value="mr">Marathi</option>
          <option value="bn">Bengali</option>
          <option value="as">Assamese</option>
          <option value="gu">Gujarati</option>
          <option value="kn">Kannada</option>
          <option value="or">Odia</option>
          <option value="pa">Punjabi</option>
        </select>
      </div>

      <div className="selectCtn">
        <label>Translate to:</label>
        <select
          id="targetLanguage"
          value={targetLanguage}
          onChange={handleTargetLanguageChange}
          className="translate-to"
        >
          <option value="hi">Hindi</option>
          <option value="en">English</option>
          <option value="ta">Tamil</option>
          <option value="te">Telugu</option>
          <option value="ml">Malayalam</option>
          <option value="mr">Marathi</option>
          <option value="bn">Bengali</option>
          <option value="as">Assamese</option>
          <option value="gu">Gujarati</option>
          <option value="kn">Kannada</option>
          <option value="or">Odia</option>
          <option value="pa">Punjabi</option>
        </select>
      </div>

      <div className="btn-container">
        {!translating ? (
          <button id="translateButton" onClick={handleTranslateClick}>
            Translate
          </button>
        ) : (
          <button id="translateButton" disabled onClick={handleTranslateClick}>
            Translating
          </button>
        )}
      </div>
      <div className='footer-cont'>
      <footer className="footer-ctn">
        <label className="footer">Developed by</label>
        <img src="img/scaler.png" alt="Bhashini" className="scaler-logo" />
      </footer>
      </div>
    </div>
  )
}

export default Popup
