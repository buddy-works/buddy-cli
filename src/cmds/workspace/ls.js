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
  api.getWorkspaces(args, (err, obj) => {
    if (err) output.error(args.json, err.message);
    else {
      const table = args.json ? [] : [['NAME']];
      if (obj && obj.workspaces && obj.workspaces.length > 0) {
        for (let i = 0; i < obj.workspaces.length; i += 1) {
          if (args.json) {
            table.push(obj.workspaces[i].domain);
          } else {
            table.push([obj.workspaces[i].domain]);
          }
        }
      }
      output.table(args.json, table);
    }
  });
};
