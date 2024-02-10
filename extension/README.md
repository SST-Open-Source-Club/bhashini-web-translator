# Bhashini Chrome Extension

Bhashini Extension is a Chrome extension that allows users to translate web page content into local regional languages using the ULCA translation service.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Bhashini Extension is a Chrome extension designed to make web content more accessible by providing translation capabilities for various languages. This document provides information on installing, configuring, and using the extension.

## Installation

To install Bhashini, follow these steps:

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/SST-Open-Source-Club/bhashini-web-translator/extension
    cd bhashini-chrome-extension
    ```

2. Load the extension into Chrome:

    - Open Chrome and go to `chrome://extensions/`.
    - Enable "Developer mode" in the top right corner.
    - Click "Load unpacked" and select the extension directory.

3. Additional setup may be required based on your environment. Check the [Configuration](#configuration) section for details.

## Usage

Bhashini is easy to use. Follow these steps:

1. Click on the Bhashini icon in the Chrome toolbar to open the extension popup.

2. Select the source and target languages from the dropdown menus.

3. Click the "Translate" button to initiate the translation process.

4. The translated content will be displayed on the webpage.

For more detailed information, refer to the [Usage](#usage) section in the documentation.

## Configuration

Bhashini requires API key and user ID for authentication with the ULCA translation service. Follow these steps to configure the extension:

1. Open the `BhashiniTranslator.js` file.

2. Locate the following lines:

    ```javascript
    const Bhashini = new BhashiniTranslator(
      "YOUR_ULCA_API_KEY",
      "YOUR_USER_ID"
    );
    ```

3. Replace `"YOUR_ULCA_API_KEY"` and `"YOUR_USER_ID"` with your ULCA API key and user ID.

## Development

If you want to contribute or modify the extension, follow these steps:

1. Install dependencies:

    ```bash
    npm install
    ```

2. Make changes and test your modifications.

3. Submit a pull request with your changes.

For more detailed information, refer to the [Development](#development) section in the documentation.

## License

Bhashini is licensed under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for details.
