/** Textual markov chain generator */

const fs = require('fs');

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== '');
		this.makeChains();
	}

	/** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
		let chain = {};

		for (let i = 0; i < this.words.length; i++) {
			if (this.words[i + 1]) {
				// If the next word exists, set current word as a key and next word as value
				if (chain[this.words[i]]) {
					chain[this.words[i]].push(this.words[i + 1]);
				} else {
					chain[this.words[i]] = [ this.words[i + 1] ];
				}
			} else {
				// If the next word doesn't exist, set current word as key and null as value
				if (chain[this.words[i]]) {
					chain[this.words[i]].push(null);
				} else {
					chain[this.words[i]] = [ null ];
				}
			}
		}

		this.chain = chain;
	}

	/** return random text from chains */

	makeText(numWords = 100) {
		/** Set up variables */

		let text = '';
		let firstWord = this.words[Math.floor(Math.random() * this.words.length)];
		let nextWords = [];
		let nextWord = '';

		for (let i = 0; i < numWords; i++) {
			if (text.length === 0) {
				// If text is empty, assign it the randomly selected first word and assign the next word as one of its following words
				console.log(text);
				text = firstWord;
				nextWords = this.chain[firstWord];
			} else {
				// If text already has a word, use the latest word as the key and append the associated random value to text
				nextWord = nextWords[Math.floor(Math.random() * nextWords.length)];
				if (nextWord) {
					text += ` ${nextWord}`;
					nextWords = this.chain[nextWord];
				} else {
					break;
				}
			}
		}
		return text;
	}
}

module.exports = {
	MarkovMachine
};
