# Web Server

This is the webserver which uses the package made to translate the websites.

## How to use

### Install

To install the webserver, first clone the repo and then run the following command:

`npm install`

After installation you need to also add an .env file, the template is given in the .env.example file.

### Run

To run the webserver, run the following command:

`npm start`

Use any api testing tool like Postman or Insomnia. The following endpoints are available:

- /translate (GET): Send the url of the website to translate in the json format. The response will be the translated website.

## Testing

-- Integration testing with express and jest

## Limitations

- The webserver is not able to translate websites which uses client side rendering.
- The webserver is not able to translate websites which uses cookies for authentication.
- The webserver is not able to translate websites which uses authentication tokens for authentication.
- The webserver is not able to translate websites which uses sessions for authentication.
