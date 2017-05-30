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

module.exports.request = (args, done) => api.getWorkspace(args, done);

module.exports.transform = (args, obj) => ({
  name: obj.domain,
  display_name: obj.name,
  url: obj.html_url,
  frozen: obj.frozen,
  created: obj.create_date,
});

module.exports.render = (args, obj) => output.props(args.json, obj);

module.exports.handler = (args) => {
  exports.request(args, (err, obj) => {
    if (err) output.error(args.json, obj.message);
    else exports.render(args, exports.transform(args, obj));
  });
};
