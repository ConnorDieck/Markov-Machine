const { MarkovMachine } = require('./markov');

function countWords(str) {
	return str.split(' ').length;
}

test('MakeText should not exceed numWords', () => {
	const text = `I could not, would not, on a boat. 
                        I will not, will not, with a goat. 
                        I will not eat them in the rain. 
                        I will not eat them on a train. 
                        Not in the dark! Not in a tree!
                        Not in a car! You let me be!
                        I do not like them in a box.
                        I do not like them with a fox.
                        I will not eat them in a house.
                        I do not like them with a mouse.
                        I do not like them here or there.
                        I do not like them anywhere!`;

	let testMachine = new MarkovMachine(text);

	const numWords = countWords(testMachine.makeText());

	expect(numWords).toBeLessThanOrEqual(100);
});

test('makeChains should return the correct chain', () => {
	let testMachine = new MarkovMachine('the cat in the hat');
	const chain = { the: [ 'cat', 'hat' ], cat: [ 'in' ], in: [ 'the' ], hat: [ null ] };

	expect(testMachine.chain).toEqual(chain);
});
