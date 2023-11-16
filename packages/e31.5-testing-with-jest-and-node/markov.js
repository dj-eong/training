/** Textual markov chain generator */


class MarkovMachine {

    /** build markov machine; read in text.*/

    constructor(text) {
        let words = text.split(/[ \r\n]+/);
        this.words = words.filter(c => c !== "");
        this.chains = this.makeChains();
    }

    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

    makeChains() {
        // TODO
        const obj = {};
        for (let i = 0; i < this.words.length; i++) {
            if (obj[this.words[i]]) {
                obj[this.words[i]].push(this.words[i + 1]);
            } else {
                obj[this.words[i]] = [this.words[i + 1]];
            }
        }
        // console.log(obj);
        return obj;
    }


    /** return random text from chains */

    makeText(numWords = 100) {
        // TODO
        const keys = Object.keys(this.chains);
        let word = keys[Math.floor(Math.random() * keys.length)];
        let phrase = word;
        for (let i = 1; i < numWords; i++) {
            word = this.chains[word][Math.floor(Math.random() * this.chains[word].length)];
            if (word == undefined) break;
            phrase = phrase + ' ' + word;
        }
        return phrase;
    }
}

// let mm = new MarkovMachine("the cat in the hat");

module.exports = {
    MarkovMachine: MarkovMachine
};