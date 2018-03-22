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
  r: {
    alias: 'revision',
    describe: 'Revision from the repository that will be executed in the pipeline',
    type: 'string',
  },
  b: {
    alias: 'branch',
    describe: 'Branch name from the repository that will be executed in the pipeline',
    type: 'string',
  },
  g: {
    alias: 'tag',
    describe: 'Tag name from the repository that will be executed in the pipeline',
    type: 'string',
  },
  c: {
    alias: 'comment',
    describe: 'Execution comment',
    type: 'string',
  },
  f: {
    alias: 'refresh',
    describe: 'Execute from scratch',
    type: 'boolean',
  },
};

module.exports.request = (args, done) => api.runPipeline(args, done);

module.exports.render = (args) => {
  let msg = 'Running pipeline\n';
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
