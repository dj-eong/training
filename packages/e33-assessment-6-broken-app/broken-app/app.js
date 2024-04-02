const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.get('/', async function (req, res, next) {
	try {
		const results = await getDevInfo(req);
		res.json(results);
	} catch (e) {
		next(e);
	}
});

async function getDevInfo(req) {
	const results = [];
	for (developer of req.body.developers) {
		const response = await axios.get(`https://api.github.com/users/${developer}`);
		results.push({ name: response.data.name, bio: response.data.bio });
	}
	return results;
}

// Error handler
app.use(function (err, req, res, next) {
	return res.status(+err.message.slice(err.message.length - 3)).json({ error: err });
});

app.listen(3000, function () {
	console.log("Server is listening on port 3000");
});
