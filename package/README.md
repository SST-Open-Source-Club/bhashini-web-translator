# Bhashini Web Translator

### **Introduction**

The Bhashini Web Translator is a JavaScript package that provides a convenient interface for translating text content within HTML documents or strings. It leverages a pipeline of translation services of Bhashini API to support the translation process.

### **Installation**

To use the Bhashini Web Translator in your project, you need to install it using npm:

```bash
bashCopy code
npm install bhashini-translator

```

### **Usage**

To use the Bhashini Translator, you need to create an instance of the **`BhashiniTranslator`** class with valid API credentials. The following sections demonstrate how to use the different translation methods provided by the package.

### 1. Initializing the Translator

```jsx
javascriptCopy code
import { BhashiniTranslator } from 'bhashini-translator';

const apiKey = 'your_api_key';
const userID = 'your_user_id';

const translator = new BhashiniTranslator(apiKey, userID);

```

### 2. Translating DOM Elements

To translate text within a DOM element, use the **`translateDOM`** method. Pass the DOM element, source language, and target language as arguments.

```jsx
javascriptCopy code
const sourceLanguage = 'en';
const targetLanguage = 'fr';

const domElement = document.getElementById('content');

translator.translateDOM(domElement, sourceLanguage, targetLanguage)
  .then((translatedDOM) => {
    // Use translatedDOM as needed
    console.log(translatedDOM);
  })
  .catch((error) => {
    console.error('Translation error:', error.message);
  });

```

### 3. Translating HTML Strings

To translate an HTML string, use the **`translateHTMLstring`** method. Pass the HTML string, source language, and target language as arguments.

```jsx
javascriptCopy code
const sourceLanguage = 'en';
const targetLanguage = 'fr';
const htmlString = '<p>Hello, world!</p>';

translator.translateHTMLstring(htmlString, sourceLanguage, targetLanguage)
  .then((translatedDOM) => {
    // Use translatedDOM as needed
    console.log(translatedDOM);
  })
  .catch((error) => {
    console.error('Translation error:', error.message);
  });

```

### 4. Translating from URL

To translate text content from a URL, use the **`translateUrl`** method. Pass the URL, source language, and target language as arguments.

```jsx
javascriptCopy code
const sourceLanguage = 'en';
const targetLanguage = 'fr';
const url = 'https://example.com';

translator.translateUrl(url, sourceLanguage, targetLanguage)
  .then((translatedDOM) => {
    // Use translatedDOM as needed
    console.log(translatedDOM);
  })
  .catch((error) => {
    console.error('Translation error:', error.message);
  });

```

### **Additional Notes**

- Ensure that the provided API key and user ID are valid.
- The translator handles HTML strings using the **`htmlStringToDOM`** function from the **`convert.js`** module.
- The translation process is asynchronous, so use promises or async/await syntax when necessary.
- The translator utilizes Axios for HTTP requests.

### **Conclusion**

The Bhashini Translator simplifies the process of translating text content within HTML documents or strings. By following the provided examples, you can seamlessly integrate translation functionality into your JavaScript applications.