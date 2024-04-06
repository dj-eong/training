const fs = require('fs');
const axios = require('axios');

//reads command line input
async function executeCommandLine(args) {
	const urls = readTextFile(args[2]);
	for (let url of urls) {
		const html = await getPage(url);
		if (!html) continue;
		writeToFile(`./${getDomain(url)}`, html);
	}
}

//read contents of file, split lines into array
function readTextFile(path) {
	try {
		return fs.readFileSync(path, 'utf8').split("\r\n");
	} catch (err) {
		console.error('READING ERROR: File does not exist.');
		process.exit(1);
	}
}

//get request to url, download html
async function getPage(url) {
	try {
		const res = await axios.get(url);
		return res.data;
	} catch (err) {
		console.log(`Couldn't download ${url}`);
	}
}

const getDomain = (url) => {
	const domain = new URL(url).hostname;
	return domain.toString();
};

//write the html data from the url into a new file
function writeToFile(file, html) {
	fs.writeFile(file, html, 'utf8', err => {
		if (err) {
			console.log('WRITING ERROR');
			process.exit(1);
		}
		console.log(`Wrote to ${file}`);
	});
}

executeCommandLine(process.argv);


