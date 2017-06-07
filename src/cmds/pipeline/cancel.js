const api = require('../../api');
const output = require('../../output');
const config = require('../../config');

module.exports.command = 'cancel [pipeline]';

module.exports.aliases = 'c';

module.exports.describe = 'cancel execution of a given pipeline';

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

module.exports.request = (args, done) => {
  api.getLastExecution(args, (err, obj) => {
    if (err) done(err);
    else if (!obj) done(new Error('Pipeline has no executions yet'));
    else if (obj.status !== 'INPROGRESS' && obj.status !== 'ENQUEUED') done(new Error('Pipeline is not running right now'));
    else api.cancelPipeline(obj.id, args, done);
  });
};

module.exports.render = (args) => {
  let msg = 'Stopping pipeline\n';
  msg += 'Check its status by running:\n\n';
  msg += `buddy-cli pl i ${config.get(config.KEY_PIPELINE)}`;
  output.ok(args.json, msg);
};

module.exports.handler = (args) => {
  exports.request(args, (err) => {
    if (err) output.error(args.json, err.message);
    else exports.render(args);
  });
};
