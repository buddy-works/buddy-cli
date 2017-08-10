const config = require('../../config');
const output = require('../../output');

module.exports.command = 'clear';

module.exports.describe = 'remove all stored aliases';

module.exports.builder = {
  j: {
    default: false,
    alias: 'json',
    describe: 'Output json',
    type: 'boolean',
  },
};

module.exports.handler = (args) => {
  config.clearAliases();
  output.ok(args.json, 'Cleared');
};
