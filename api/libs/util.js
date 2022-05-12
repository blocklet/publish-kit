const { customRandom, urlAlphabet, random } = require('nanoid');

const { SUPPORTED_CONTENT_TYPES } = require('./const');

const nanoid = customRandom(urlAlphabet, 24, random);

const isTypeEnabled = (type) => {
  return process.env.CONTENT_TYPES.split(',')
    .map((x) => x.trim())
    .filter((x) => SUPPORTED_CONTENT_TYPES.includes(x))
    .includes(type);
};

module.exports = { nanoid, isTypeEnabled };
