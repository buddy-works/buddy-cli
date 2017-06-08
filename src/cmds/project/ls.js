const api = require('../../api');
const output = require('../../output');

module.exports.command = 'ls';

module.exports.describe = 'workspace projects list';

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
  s: {
    default: 'ANY',
    alias: 'status',
    describe: 'Filter by project status',
    choices: ['ACTIVE', 'CLOSED', 'ANY'],
    type: 'string',
  },
  m: {
    alias: 'mine',
    describe: 'Show only projects in which user is a member',
    type: 'boolean',
  },
  e: {
    default: 1,
    alias: 'page',
    describe: `Which page to show (by default first ${api.perPage} projects are shown)`,
    type: 'number',
  },
};

module.exports.request = (args, done) => {
  api.getProjects(args, (err, obj) => {
    if (err) done(err);
    else done(null, obj.projects);
  });
};

module.exports.transform = (args, obj) => {
  const table = args.json ? [] : [['NAME', 'STATUS']];
  for (let i = 0; i < obj.length; i += 1) {
    const o = obj[i];
    if (args.json) {
      table.push({
        name: o.name,
        status: o.status,
      });
    } else {
      table.push([o.name, o.status]);
    }
  }
  return table;
};

module.exports.render = (args, obj) => output.table(args.json, obj);

/**
 * @param {object} args
 */
module.exports.handler = (args) => {
  exports.request(args, (err, obj) => {
    if (err) output.error(args.json, err.message);
    else {
      exports.render(args, exports.transform(args, obj));
      if (!args.json && (obj.length === api.perPage)) {
        output.askForMore(() => {
          const a = args;
          a.page += 1;
          exports.handler(a);
        });
      }
    }
  });
};
