# Web Server

## Introduction

This Web Server is a JavaScript web server application that utilizes the Bhashini translation service to translate the content of a given web page from one language to another. This documentation provides an overview of the project structure and key components.

## Project Structure

### 1. `index.js`

This file serves as the main entry point for the Bhashini Web Translator application. It initializes an Express.js server, handles incoming requests, and utilizes the BhashiniTranslator and fetchHTML modules to translate web content.

### Dependencies

- `express`: A web application framework for Node.js.
- `@scaler-school-of-technology/bhashini-web-translator`: Bhashini translation service client.
- `dotenv`: Loads environment variables from a `.env` file.
- `./fetchHTML.js`: Module for fetching the body element content from a given URL.

### 2. `fetchHTML.js`

This module provides functionality to fetch the HTML content of a web page and extract the body element content using Axios for HTTP requests and Cheerio for HTML parsing.

### Dependencies

- `axios`: A promise-based HTTP client for the browser and Node.js.
- `cheerio`: A fast, flexible, and lean implementation of jQuery for the server.

## Setup and Configuration

1. Install dependencies:
    
    ```bash
    npm install
    
    ```
    
2. Create a `.env` file in the project root with the following variables:
    
    ```
    BHASHINI_API_KEY=<Your Bhashini API Key>
    BHASHINI_USER_ID=<Your Bhashini User ID>
    
    ```
    

## Running the Server

Start the Bhashini Web Translator server by running the following command:

```bash
npm start

```

The server will be accessible at `http://localhost:3000`.

## Endpoints

### 1. `/`

- **Method**: GET
- **Description**: Welcome message for the Bhashini Web Translator app.

### 2. `/translate`

- **Method**: GET
- **Description**: Send the URL of the website to translate in the JSON format. The response will be the translated website
- **Parameters**:
    - `url` (string): The URL of the web page to be translated.

## Usage

1. Access the homepage:
    
    ```
    GET <http://localhost:3000/>
    
    ```
    
2. Translate a web page:
    
    ```
    GET <http://localhost:3000/translate?url=><URL_OF_WEB_PAGE>
    
    ```
    

## Limitations

- The web server is not able to translate websites that use client-side rendering
- The web server is not able to translate websites that use cookies for authentication.
- The web server is not able to translate websites that use authentication tokens for authentication tokens for authentication.
- The web server is not able to translate websites that use sessions for authentication.

## Important Notes

- Ensure that the required environment variables (`BHASHINI_API_KEY` and `BHASHINI_USER_ID`) are set in the `.env` file.
- The server is set to listen on port 3000 by default. Adjust the `app.listen` method in `index.js` if a different port is desired.

## Conclusion

This Web Server translates web page content using the Bhashini translation service. Developers can extend and modify the application to meet specific requirements or integrate it into other projects.
