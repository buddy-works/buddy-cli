const config = require('../../config');
const output = require('../../output');

const allowedKeys = config.getAllKeys().slice();
allowedKeys.push('all');

module.exports.command = 'get [key]';

module.exports.describe = 'view current config';
module.exports.builder = {
  j: {
    default: false,
    alias: 'json',
    describe: 'Output json',
    type: 'boolean',
  },
  key: {
    default: 'all',
    choices: allowedKeys,
  },
};

module.exports.handler = (args) => {
  if (args.key === 'all') {
    output.props(args.json, config.getAll());
  } else {
    const res = {};
    res[args.key] = config.get(args.key);
    output.props(args.json, res);
  }
};
