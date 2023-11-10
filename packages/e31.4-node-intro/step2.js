const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("ERROR:", err);
            process.kill(1);
        }
        console.log(data);
    });
}

// cat(process.argv[2]);


async function webCat(url) {
    try {
        const res = await axios.get(url);
        console.log(res.data);
    } catch (err) {
        console.log("ERROR:", err);
        process.kill(1);
    }
}

// webCat('http://google.com');

function checkArg(arg) {
    if (arg.startsWith('http://') || arg.startsWith('https://')) {
        webCat(arg);
    } else {
        cat(arg);
    }
}

checkArg(process.argv[2]);