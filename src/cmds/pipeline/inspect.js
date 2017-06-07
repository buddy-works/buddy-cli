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
    describe: 'Token to authenticate request',
    type: 'string',
  },
  u: {
    alias: 'url',
    describe: 'Base url for app (default: api.buddy.works)',
    type: 'string',
  },
  w: {
    alias: 'workspace',
    describe: 'Name of a workspace in which run this command',
    type: 'string',
  },
  p: {
    alias: 'project',
    describe: 'Name of a project in which run this command',
    type: 'string',
  },
};

module.exports.request = (args, done) => api.getPipeline(args, done);

module.exports.transform = (args, obj) => ({
  id: obj.id,
  display_name: obj.name,
  url: obj.html_url,
  mode: obj.trigger_mode,
  status: obj.last_execution_status,
  created: obj.create_date,
  branch: obj.ref_name,
  active: obj.active,
});

module.exports.render = (args, obj) => output.props(args.json, obj);

module.exports.handler = (args) => {
  exports.request(args, (err, obj) => {
    if (err) output.error(args.json, err.message);
    else exports.render(args, exports.transform(args, obj));
  });
};
