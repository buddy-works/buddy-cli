const config = require('../../config');
const output = require('../../output');

module.exports.command = 'get [key]';

module.exports.describe = 'view alias';
module.exports.builder = {
  j: {
    default: false,
    alias: 'json',
    describe: 'Output json',
    type: 'boolean',
  },
  key: {
    default: '',
  },
};

module.exports.handler = (args) => {
  if (args.key === '') {
    output.props(args.json, config.getAllAliases(), true);
  } else {
    const res = {};
    res[args.key] = config.getAlias(args.key);
    output.props(args.json, res, true);
  }
};
