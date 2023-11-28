// const express = require('express');
import express from 'express';
import BhashiniTranslator from '@scaler-school-of-technology/bhashini-web-translator-node';
import dotenv from 'dotenv';
import { fetchBodyFromUrl } from './fetchHTML.js';
// import fs from 'fs';

dotenv.config();
const translator = new BhashiniTranslator(
	process.env.BHASHINI_API_KEY,
	process.env.BHASHINI_USER_ID
);

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello, Welcome to translate app!');
});

app.get('/translate', async (req, res) => {
	var { url } = req.query;
	// Remove quotes from url
	url = url.replace(/['"]+/g, '');
	// console.log(url);
	let dta = await translate(url);
	res.send(dta);
});

const translate = async (url) => {
	try {
		const bodyContent = await fetchBodyFromUrl(url);
		// console.log(bodyContent);
		const translated = (
			await translator.translateHTMLstring(bodyContent, 'en', 'hi')
		).outerHTML;
		return translated;
	} catch (error) {
		// fs.writeFileSync('./error.txt', JSON.stringify(error));
		console.error(error);
	}
};

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});
