#!/usr/bin/env node

const program = require('commander');
const pJson = require('../package.json');

program.version(pJson.version);
program
  .command('config <cmd>', 'get, set config')
  .alias('cf');

program
  .command('workspace <cmd>', 'workspace list, details')
  .alias('ws');

program
  .command('project <cmd>', 'list workspace projects')
  .alias('pj');

program
  .command('pipeline <cmd>', 'pipeline list, inspect, operations')
  .alias('pl');

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
