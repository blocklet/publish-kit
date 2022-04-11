const { customRandom, urlAlphabet, random } = require('nanoid');

const nanoid = customRandom(urlAlphabet, 24, random);

module.exports = { nanoid };
