const api = require('../../api');
const output = require('../../output');

module.exports.command = 'inspect [project]';

module.exports.describe = 'show project details';

module.exports.aliases = 'i';

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
  w: {
    alias: 'workspace',
    describe: 'name of a workspace in which run this command',
    type: 'string',
  },
};

module.exports.handler = (args) => {
  api.getProject(args, (err, obj) => {
    if (err) output.error(args.json, err.message);
    else {
      output.props(args.json, {
        name: obj.name,
        display_name: obj.display_name,
        url: obj.html_url,
        status: obj.status,
        created: obj.create_date,
      });
    }
  });
};
