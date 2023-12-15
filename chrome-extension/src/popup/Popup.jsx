import { useState } from 'react'
import { useEffect } from 'react'

import './Popup.css'

export const Popup = () => {
  const [targetLanguage, setTargetLanguage] = useState('hi')
  const [translating, setTranslating] = useState(false)
  const [isDefault, setDefault] = useState(false)

  const handleDefault = (event) => {
    setDefault(event.target.checked)
    chrome.storage.sync.set({ default: event.target.checked }, function () {
      console.log('Value is of default set to ' + event.target.checked)
    })

    if (event.target.checked) {
      chrome.storage.sync.set({ targetLanguage: targetLanguage }, function () {
        console.log('Value is target language set to ' + targetLanguage)
      })
    }
  }

  const handleTargetLanguageChange = (event) => {
    setTargetLanguage(event.target.value)
  }

  const handleTranslateClick = () => {
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
          if (response.message === 'success') {
            setTransalting(false)
          }
        },
      )
    })
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

  return (
    <div className="language-select-container">
      <img src="img/logo.png" alt="Bhashini" class="logo" />

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

      <div className="checkbox-container">
        <label for="saveAsDefault">
          <div>Remember for future use.</div>
          <input type="checkbox" id="saveAsDefault" onChange={handleDefault} checked={isDefault} />
        </label>
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

      <footer className="footer-ctn">
        <label className="footer">Developed by</label>
        <img src="img/scaler.png" alt="Bhashini" className="scaler-logo" />
      </footer>
    </div>
  )
}

export default Popup
