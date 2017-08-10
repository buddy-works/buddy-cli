const config = require('../../config');
const output = require('../../output');

module.exports.command = 'set <key> [val]';

module.exports.describe = 'set alias for any key & value. On next cli call wherever key is used we replace it with its value';

module.exports.builder = {
  j: {
    default: false,
    alias: 'json',
    describe: 'Output json',
    type: 'boolean',
  },
};

module.exports.handler = (args) => {
  config.setAlias(args.key, args.val);
  output.ok(args.json, 'Alias saved');
};
