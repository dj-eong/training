/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

function read(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log('ERROR:', err);
            process.kill(1);
        }
        let mm = new MarkovMachine(data);
        console.log(mm.makeText());
    });
}

async function readURL(path) {
    try {
        const res = await axios.get(path);
        let mm = new MarkovMachine(res.data);
        console.log(mm.makeText());
    } catch (err) {
        console.log("ERROR:", err);
        process.kill(1);
    }
}

function checkArgs(args) {
    if (args[2] == 'file') {
        read(args[3]);
    } else if (args[2] == 'url') {
        readURL(args[3]);
    } else {
        console.log('ERROR: Unknown input');
        process.kill(1);
    }
}

checkArgs(process.argv);

