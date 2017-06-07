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
};

module.exports.request = (args, done) => api.getProject(args, done);

module.exports.render = (args, obj) => output.props(args.json, obj);

module.exports.transform = (args, obj) => ({
  name: obj.name,
  display_name: obj.display_name,
  url: obj.html_url,
  status: obj.status,
  created: obj.create_date,
});

module.exports.handler = (args) => {
  exports.request(args, (err, obj) => {
    if (err) output.error(args.json, obj.message);
    else exports.render(args, exports.transform(args, obj));
  });
};
