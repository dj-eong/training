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

async function webCat(url) {
    try {
        const res = await axios.get(url);
        console.log(res.data);
    } catch (err) {
        console.log("ERROR:", err);
        process.kill(1);
    }
}

function catWrite(args) {
    fs.readFile(args[4], 'utf8', (err, data) => {
        if (err) {
            console.log("ERROR:", err);
            process.kill(1);
        }
        fs.appendFile(args[3], data, 'utf8', err => {
            if (err) {
                console.log("ERROR!!!", err);
                process.kill(1);
            }
        });
    });
}

function webCatWrite(args) {
    fs.appendFile(args[3], args[4], 'utf8', err => {
        if (err) {
            console.log("ERROR!!!", err);
            process.kill(1);
        }
    });
}

function checkArgs(args) {
    if (args[2] == '--out') {
        if (args[4].startsWith('http://') || args[4].startsWith('https://')) {
            webCatWrite(args);
        } else {
            catWrite(args);
        }
    } else {
        if (args[2].startsWith('http://') || args[2].startsWith('https://')) {
            webCat(args[2]);
        } else {
            cat(args[2]);
        }
    }

}
checkArgs(process.argv);