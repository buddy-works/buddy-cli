const api = require('../../api');
const output = require('../../output');

module.exports.command = 'ls';

module.exports.describe = 'workspace list';

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
};

module.exports.transform = (args, obj) => {
  const table = args.json ? [] : [['NAME']];
  for (let i = 0; i < obj.length; i += 1) {
    if (args.json) {
      table.push(obj[i].domain);
    } else {
      table.push([obj[i].domain]);
    }
  }
  return table;
};

module.exports.request = (args, done) => {
  api.getWorkspaces(args, (err, obj) => {
    if (err) done(err);
    else done(null, obj.workspaces);
  });
};

module.exports.render = (args, obj) => output.table(args.json, obj);

module.exports.handler = (args) => {
  exports.request(args, (err, obj) => {
    if (err) output.error(args.json, err.message);
    else exports.render(args, exports.transform(args, obj));
  });
};
