/* eslint-disable no-console */

const pact = require('@pact-foundation/pact-node');
const path = require('path');

const consumerVersion = `1.0.0-${process.env.BUILD_NUMBER ||
  Math.floor(new Date() / 1000)}`;

const opts = {
  pactFilesOrDirs: [path.resolve(__dirname, '../pacts')],
  pactBroker: 'http://localhost:9292',
  consumerVersion,
};

pact
  .publishPacts(opts)
  .then(() => {
    console.log('Pact successfully published!');
  })
  .catch(e => {
    console.log(`Pact failed to publish: ${e}`);
  });
