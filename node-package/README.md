# NPM package

# **Bhashini Web Translator**

This npm package that allows you to easily integrate language translation capabilities into your web applications. It leverages a pipeline-based translation approach using ULCA APIs for efficient and accurate translations.

## **Installation**

To install Bhashini Web Translator, use the following npm command:

```bash
npm install bhashini-web-translator

```

## **Usage**

```jsx
javascriptCopy code
import BhashiniTranslator from '@scaler-school-of-technology/bhashini-web-translator';

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

- Seamless integration of language translation into your web application.
- Efficient translation pipeline for improved performance.
- Supports translation of both DOM elements and HTML strings.

## **License**

This project is licensed under the MIT License - see the [LICENSE](https://chat.openai.com/c/LICENSE) file for details.

## **Acknowledgments**

- Bhashini Web Translator is powered by ULCA APIs.