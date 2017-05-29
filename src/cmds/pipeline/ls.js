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
    describe: `which page to show (by default first ${api.perPage} pipelines are shown`,
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
      id: obj[i].id,
      display_name: obj[i].name,
      status: obj[i].last_execution_status,
    });
  }
  output.table(true, table);
};
/**
 * @param {object} args
 */
const fetchAndRender = (args) => {
  api.getPipelines(args, (err, obj) => {
    if (err) output.error(args.json, err.message);
    else if (args.json) renderJson(obj.pipelines);
    else renderText(args, obj.pipelines);
  });
};
/**
 * @param {object} args
 * @param {Array} obj
 */
renderText = (args, obj) => {
  const table = [['ID', 'DISPLAY NAME', 'STATUS']];
  for (let i = 0; i < obj.length; i += 1) {
    table.push([obj[i].id, obj[i].name, obj[i].last_execution_status]);
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
