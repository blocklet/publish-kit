/* eslint-disable no-console */
require('@blocklet/sdk/lib/error-handler');
require('dotenv-flow').config();

const Client = require('@ocap/client');

const env = require('../libs/env');
const { wallet } = require('../libs/auth');
const { SUPPORTED_CONTENT_TYPES } = require('../libs/const');
const { name } = require('../../package.json');

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

const ensureAccountDeclared = async () => {
  if (env.isComponent) return;
  if (!env.chainHost) return;

  const client = new Client(env.chainHost);
  const { state } = await client.getAccountState({ address: wallet.toAddress() }, { ignoreFields: ['context'] });
  if (!state) {
    const hash = await client.declare({ moniker: name, wallet });
    console.info(`app account declared on chain ${env.chainHost}`, hash);
  } else {
    console.info(`app account already declared on chain ${env.chainHost}`);
  }
};

(async () => {
  try {
    await ensureContentTypes();
    await ensureAccountDeclared();
    process.exit(0);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
})();
