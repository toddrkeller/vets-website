const environments = require('./environments');

module.exports = {
  [environments.LOCALHOST]: '0.0.0.0',
  [environments.VAGOVDEV]: 'dev.va.gov',
  [environments.VAGOVSTAGING]: 'staging.va.gov',
  [environments.VAGOVPROD]: 'www.va.gov',
};
