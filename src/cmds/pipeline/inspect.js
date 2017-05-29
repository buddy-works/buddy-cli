const api = require('../../api');
const output = require('../../output');

module.exports.command = 'inspect [pipeline]';

module.exports.describe = 'show pipeline details';

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
  p: {
    alias: 'project',
    describe: 'name of a project in which run this command',
    type: 'string',
  },
};

module.exports.handler = (args) => {
  api.getPipeline(args, (err, obj) => {
    if (err) output.error(args.json, err.message);
    else {
      output.props(args.json, {
        id: obj.id,
        display_name: obj.name,
        url: obj.html_url,
        mode: obj.trigger_mode,
        status: obj.last_execution_status,
        created: obj.create_date,
        branch: obj.ref_name,
        active: obj.active,
      });
    }
  });
};
