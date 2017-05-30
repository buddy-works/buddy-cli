#!/usr/bin/env node

const yargs = require('yargs');
const pJson = require('../package.json');

yargs
  .recommendCommands()
  .commandDir('../src/cmds')
  .demandCommand(1, 'Provide at least one command')
  .version('v', 'Show version', pJson.version)
  .alias('v', 'version')
  .help('h')
  .alias('h', 'help')
  .parse(process.argv.slice(2));
