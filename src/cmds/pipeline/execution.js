const api = require('../../api');
const output = require('../../output');

module.exports.command = 'execution [execution]';

module.exports.describe = 'show pipeline execution details (default: last)';

module.exports.aliases = 'ex';

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
  l: {
    alias: 'pipeline',
    describe: 'id of a pipeline in which run this command',
    type: 'string',
  },
};
/**
 * @param {object} args
 * @param {object} obj
 */
const renderProps = (args, obj) => {
  let branch = null;
  if (obj.branch) {
    branch = obj.branch.name;
  }
  let toRevision = null;
  if (obj.to_revision) {
    toRevision = obj.to_revision.revision;
  }
  let fromRevision = null;
  if (obj.from_revision) {
    fromRevision = obj.from_revision.revision;
  }
  let creator = null;
  if (obj.creator) {
    creator = obj.creator.name;
  }
  const props = {
    id: obj.id,
    url: obj.html_url,
    start_date: obj.start_date,
    finish_date: obj.finish_date,
    mode: obj.mode,
    refresh: obj.refresh,
    status: obj.status,
    comment: obj.comment,
    branch,
    to_revision: toRevision,
    from_revision: fromRevision,
    creator,
  };
  output.props(args.json, props);
};

module.exports.handler = (args) => {
  if (!args.execution) {
    api.getLastExecution(args, (err, obj) => {
      if (err) output.error(args.json, err.message);
      else if (!obj) output.error(args.json, 'Pipeline has no executions yet');
      else renderProps(args, obj);
    });
  } else {
    api.getExecution(args, (err, obj) => {
      if (err) output.error(args.json, err.message);
      else renderProps(args, obj);
    });
  }
};
