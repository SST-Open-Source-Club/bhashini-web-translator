import express from 'express';
import BhashiniTranslator from '@scaler-school-of-technology/bhashini-web-translator-node';
import dotenv from 'dotenv';
import { fetchBodyFromUrl } from './fetchHTML.js';

dotenv.config();

const API_KEY = process.env.BASHINI_API_KEY;
const USER_ID = process.env.BASHINI_USER_ID;

const translator = new BhashiniTranslator(API_KEY, USER_ID);

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello, Welcome to translate app!');
});

app.get('/translate', async (req, res) => {
	try {
		var { url } = req.query;
		url = url.replace(/['"]+/g, '');
		let dta = await translate(url);
		res.send(dta);
	} catch (e) {
		res.status(500).send(e);
	}
});

const translate = async (url) => {
	const bodyContent = await fetchBodyFromUrl(url);
	const translated = (
		await translator.translateHTMLstring(bodyContent, 'en', 'hi', 20)
	).outerHTML;
	return translated;
};

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});
