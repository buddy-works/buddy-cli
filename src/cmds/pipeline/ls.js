const api = require('../../api');
const output = require('../../output');

module.exports.command = 'ls';

module.exports.describe = 'project pipelines list';

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
  e: {
    default: 1,
    alias: 'page',
    describe: `Which page to show (by default first ${api.perPage} pipelines are shown)`,
    type: 'number',
  },
};

module.exports.request = (args, done) => {
  api.getPipelines(args, (err, obj) => {
    if (err) done(err);
    else done(null, obj.pipelines);
  });
};

module.exports.render = (args, obj) => output.table(args.json, obj);

module.exports.transform = (args, obj) => {
  const table = args.json ? [] : [['ID', 'DISPLAY NAME', 'STATUS']];
  for (let i = 0; i < obj.length; i += 1) {
    if (args.json) {
      table.push({
        id: obj[i].id,
        display_name: obj[i].name,
        status: obj[i].last_execution_status,
      });
    } else {
      table.push([obj[i].id, obj[i].name, obj[i].last_execution_status]);
    }
  }
  return table;
};

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
