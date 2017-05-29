const api = require('../../api');
const output = require('../../output');

module.exports.command = 'inspect [workspace]';

module.exports.aliases = 'i';

module.exports.describe = 'show workspace details';

module.exports.builder = {
  j: {
    default: false,
    alias: 'json',
    describe: 'Output json',
    type: 'boolean',
  },
  t: {
    alias: 'token',
    describe: 'token to authenticate request',
    type: 'string',
  },
  u: {
    alias: 'url',
    describe: 'base url for app (default: api.buddy.works)',
    type: 'string',
  },
};

module.exports.handler = (args) => {
  api.getWorkspace(args, (err, obj) => {
    if (err) output.error(args.json, err.message);
    else {
      output.props(args.json, {
        name: obj.domain,
        display_name: obj.name,
        url: obj.html_url,
        frozen: obj.frozen,
        created: obj.create_date,
      });
    }
  });
};
