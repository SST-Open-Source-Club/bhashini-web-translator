# Web Package

# **Bhashini Web Translator**

Bhashini Web Translator is an npm package that enables seamless language translation integration into your web applications. It utilizes a pipeline-based translation approach using ULCA APIs, ensuring efficient and accurate translations.

## **Installation**

To install Bhashini Web Translator, use the following npm command:

```bash
npm install bhashini-web-translator

```

## **Usage**

```jsx
javascriptCopy code
import BhashiniTranslator from 'bhashini-web-translator';

// Replace 'YOUR_API_KEY' and 'YOUR_USER_ID' with your ULCA API key and user ID
const translator = new BhashiniTranslator('YOUR_API_KEY', 'YOUR_USER_ID');

// Example: Translate a DOM element
const sourceLanguage = 'en';
const targetLanguage = 'hi';
const domElement = document.getElementById('yourElementId');

translator.translateDOM(domElement, sourceLanguage, targetLanguage, batchSize)
  .then((translatedDOM) => {
    // Handle the translated DOM
    console.log(translatedDOM);
  })
  .catch((error) => {
    console.error(error.message);
  });

// Example: Translate an HTML string
const htmlString = '<p>This is a sample text</p>';

translator.translateHTMLstring(htmlString, sourceLanguage, targetLanguage, batchSize)
  .then((translatedHTML) => {
    // Handle the translated HTML string
    console.log(translatedHTML);
  })
  .catch((error) => {
    console.error(error.message);
  });

```

Make sure to replace 'YOUR_API_KEY' and 'YOUR_USER_ID' with your actual ULCA API key and user ID.

## **Features**

- **Efficient Translation Pipeline:** Utilizes ULCA APIs for an optimized translation process.
- **Error Handling:** Includes automatic retries with a fail count limit for robustness.
- **DOM and HTML Support:** Enables translation of both DOM elements and HTML strings.

## **License**

This project is licensed under the MIT License - see the [LICENSE](https://chat.openai.com/c/LICENSE) file for details.

## **Acknowledgments**

- Bhashini Web Translator is powered by ULCA APIs.