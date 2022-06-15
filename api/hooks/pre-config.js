require('@blocklet/sdk/lib/error-handler');
require('dotenv-flow').config();

const { SUPPORTED_CONTENT_TYPES } = require('../libs/const');

const ensureContentTypes = () => {
  if (
    process.env.CONTENT_TYPES.split(',')
      .map((x) => x.trim())
      .filter((x) => SUPPORTED_CONTENT_TYPES.includes(x)).length === 0
  ) {
    console.error(`CONTENT_TYPES not valid, should only be one or more from ${SUPPORTED_CONTENT_TYPES.join(',')}`);
    process.exit(1);
  }
};

(async () => {
  try {
    ensureContentTypes();
    process.exit(0);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
})();
