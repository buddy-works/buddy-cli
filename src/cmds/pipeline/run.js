const api = require('../../api');
const output = require('../../output');
const config = require('../../config');

module.exports.command = 'run [pipeline]';

module.exports.aliases = 'r';

module.exports.describe = 'execute given pipeline';

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
  r: {
    alias: 'revision',
    describe: 'revision from the repository that will be executed in the pipeline',
    type: 'string',
  },
  c: {
    alias: 'comment',
    describe: 'execution comment',
    type: 'string',
  },
  f: {
    alias: 'refresh',
    describe: 'execute from scratch',
    type: 'boolean',
  },
};

module.exports.handler = (args) => {
  api.runPipeline(args, (err) => {
    if (err) output.error(args.json, err.message);
    else {
      let msg = 'Running pipeline\n';
      msg += 'Check its status by running:\n\n';
      msg += `buddy-cli pl i ${config.get(config.KEY_PIPELINE)}`;
      output.ok(args.json, msg);
    }
  });
};
