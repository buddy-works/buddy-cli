const api = require('../../api');
const output = require('../../output');
const config = require('../../config');

module.exports.command = 'retry [pipeline]';

module.exports.aliases = 't';

module.exports.describe = 'retry execution of a given pipeline';

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
  api.getLastExecution(args, (err, obj) => {
    if (err) output.error(args.json, err.message);
    else if (!obj) output.error(args.json, 'Pipeline has no executions yet');
    else if (obj.status !== 'FAILED' && obj.status !== 'TERMINATED') output.error(args.json, 'Pipeline last execution is not failed or terminated');
    else {
      api.retryPipeline(obj.id, args, (err2) => {
        if (err2) output.error(args.json, err2.message);
        else {
          let msg = 'Retrying pipeline\n';
          msg += 'Check its status by running:\n\n';
          msg += `buddy-cli pl i ${config.get(config.KEY_PIPELINE)}`;
          output.ok(args.json, msg);
        }
      });
    }
  });
};
