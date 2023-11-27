# Bashini Chrome Extention


### 1. **Overview:**

- **Name:** Bhashini Translator Chrome Extension
- **Description:** A Chrome extension for translating the content of a webpage using BhashiniTranslator.
- **Functionality:** Allows users to select source and target languages, then translates the content of the currently active tab.

### 2. **Files:**

- **App.jsx:**
    - React component for the extension's user interface.
    - Handles language selection and triggers content translation.
- **main.jsx:**
    - Renders the `App` component using ReactDOM.

### 3. **Dependencies:**

- **React:**
    - Used for building the user interface.
- **BhashiniTranslator:**
    - Handles translation using the Bhashini Translator API.
    - Requires a valid API key and secret during instantiation.

### 4. **Extension Structure:**

- **Manifest File (`manifest.json`):**
    - Contains metadata and configuration for the extension.
    - Should include necessary permissions, icons, and scripts.
- **Content Scripts:**
    - Utilizes `chrome.scripting.executeScript` to interact with the content of the active tab.

### 5. **User Interface:**

- **Language Selection:**
    - Provides dropdowns for selecting source and target languages.
- **Translate Button:**
    - Triggers the translation process.

### 6. **Translation Process:**

- **BhashiniTranslator Integration:**
    - Utilizes BhashiniTranslator to translate the content of the webpage.
    - Source language is determined by the user's selection.
    - Target language is determined by the user's selection.
- **ExecuteScript:**
    - Uses `chrome.scripting.executeScript` to run scripts in the context of the active tab.
    - Changes the background color of the webpage to red (example action).
    - Translates the content of the webpage using BhashiniTranslator.

### 7. **Usage:**

- **Installation:**
    - Install the extension from the Chrome Web Store or by loading an unpacked extension.
- **Interaction:**
    - Open a webpage and click the extension icon.
    - Select source and target languages.
    - Click the "Translate" button to see the translated content.

### 8. **Configuration:**

- **BhashiniTranslator Credentials:**
    - Ensure the API key and secret provided to BhashiniTranslator in `App.jsx` are valid.
- **Manifest Configuration:**
    - Configure the manifest file with appropriate permissions, icons, and other required settings.

### 9. **Notes:**

- **Error Handling:**
    - Implement error handling for BhashiniTranslator API calls.
- **Security:**
    - Keep API keys and secrets secure.

### Conclusion:

This documentation provides an overview of the Bhashini Translator Chrome Extension, covering its structure, functionality, usage, and configuration. Make sure to integrate this information with your manifest file and any additional scripts to create a fully functional extension.