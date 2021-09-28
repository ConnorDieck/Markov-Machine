/** Command-line tool to generate Markov text. */

const fs = require('fs');
const process = require('process');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

function genText(text) {
	let mm = new MarkovMachine(text);
	console.log(mm.makeText());
}

// Read file to generate text
function makeText(path) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.error(`Cannot read file: ${path}: ${err}`);
			process.exit(1);
		}
		genText(data);
	});
}

// Read url to generate text
async function makeURLText(url) {
	let resp;

	try {
		resp = await axios.get(url);
	} catch (err) {
		console.error(`Cannot read URL: ${url}`);
		process.exit(1);
	}
	genText(resp.data);
}

let [ type, path ] = process.argv.slice(2);

if (type === 'file') {
	makeText(path);
} else if (type === 'url') {
	makeURLText(path);
} else {
	console.error('Please indicate whether you are passing a file or a url');
	process.exit(1);
}
