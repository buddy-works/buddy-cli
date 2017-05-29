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
  s: {
    default: 'ANY',
    alias: 'status',
    describe: 'filter by project status',
    choices: ['ACTIVE', 'CLOSED', 'ANY'],
    type: 'string',
  },
  m: {
    alias: 'mine',
    describe: 'show only projects in which user is a member',
    type: 'boolean',
  },
  e: {
    default: 1,
    alias: 'page',
    describe: `which page to show (by default first ${api.perPage} projects are shown)`,
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
    table.push({
      name: obj[i].name,
      status: obj[i].status,
    });
  }
  output.table(true, table);
};
/**
 * @param {object} args
 */
const fetchAndRender = (args) => {
  api.getProjects(args, (err, obj) => {
    if (err) output.error(args.json, err.message);
    else if (args.json) renderJson(obj.projects);
    else renderText(args, obj.projects);
  });
};
/**
 * @param {object} args
 * @param {Array} obj
 */
renderText = (args, obj) => {
  const table = [['NAME', 'STATUS']];
  for (let i = 0; i < obj.length; i += 1) {
    table.push([obj[i].name, obj[i].status]);
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
/**
 * @param {object} args
 */
module.exports.handler = (args) => {
  fetchAndRender(args);
};
