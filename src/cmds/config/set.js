const config = require('../../config');
const output = require('../../output');

module.exports.command = 'set <key> [val]';

module.exports.describe = 'set token, url, workspace or project for future calls';

module.exports.builder = {
  j: {
    default: false,
    alias: 'json',
    describe: 'Output json',
    type: 'boolean',
  },
  key: {
    choices: config.getAllKeys().slice(),
  },
};

module.exports.handler = (args) => {
  config.set(args.key, args.val);
  output.ok(args.json, 'Key saved');
};
