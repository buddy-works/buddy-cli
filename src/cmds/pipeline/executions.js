const api = require('../../api');
const output = require('../../output');

module.exports.command = 'executions [pipeline]';

module.exports.describe = 'show pipeline execution history';

module.exports.aliases = 'exs';

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
  e: {
    default: 1,
    alias: 'page',
    describe: `which page to show (by default last ${api.perPage} executions are shown`,
    type: 'number',
  },
};
let renderText;
/**
 * @param {Array} obj
 */
const renderJson = (obj) => {
  const table = [];
  for (let i = 0; i < obj.length; i += 1) {
    const e = obj[i];
    let branch = null;
    if (e.branch) {
      branch = e.branch.name;
    }
    let toRevision = null;
    if (e.to_revision) {
      toRevision = e.to_revision.revision;
    }
    let fromRevision = null;
    if (e.from_revision) {
      fromRevision = e.from_revision.revision;
    }
    let creator = null;
    if (e.creator) {
      creator = e.creator.name;
    }
    table.push({
      id: e.id,
      url: e.html_url,
      start_date: e.start_date,
      finish_date: e.finish_date,
      mode: e.mode,
      refresh: e.refresh,
      status: e.status,
      comment: e.comment,
      branch,
      to_revision: toRevision,
      from_revision: fromRevision,
      creator,
    });
  }
  output.table(true, table);
};
/**
 * @param {object} args
 */
const fetchAndRender = (args) => {
  api.getExecutions(args, (err, obj) => {
    if (err) output.error(args.json, err.message);
    else if (args.json) renderJson(obj.executions);
    else renderText(args, obj.executions);
  });
};
/**
 * @param {object} args
 * @param {Array} obj
 */
renderText = (args, obj) => {
  const table = [['ID', 'TO REVISION', 'STATUS', 'FINISHED']];
  for (let i = 0; i < obj.length; i += 1) {
    const e = obj[i];
    let rev = null;
    if (e.to_revision) {
      rev = e.to_revision.revision;
      if (rev.length > 7) {
        rev = rev.substr(0, 7);
      }
    }
    table.push([e.id, rev, e.status, e.finish_date]);
  }
  output.table(false, table);
  if (obj.length === api.perPage) {
    output.askForMore(() => {
      const a = args;
      a.page += 1;
      fetchAndRender(a);
    });
  }
};

module.exports.handler = (args) => {
  fetchAndRender(args);
};
