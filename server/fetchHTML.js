import axios from 'axios';
import cheerio from 'cheerio';

async function fetchBodyFromUrl(url) {
	const response = await axios.get(url, {
		headers: {
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
		},
	});

	if (!response.data) {
		throw new Error(`Failed to fetch the webpage. No data received.`);
	}

	const $ = cheerio.load(response.data);

	const bodyContent = $('body').html();

	return bodyContent;
}

export { fetchBodyFromUrl };
