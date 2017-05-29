const config = require('../../config');
const output = require('../../output');

module.exports.command = 'clear';

module.exports.describe = 'reset config to default state';

module.exports.builder = {
  j: {
    default: false,
    alias: 'json',
    describe: 'Output json',
    type: 'boolean',
  },
};

module.exports.handler = (args) => {
  config.clear();
  output.ok(args.json, 'Cleared');
};
