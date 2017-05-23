#!/usr/bin/env node

const program = require('commander');
const pJson = require('../package.json');
const cmd = require('../src/cmds/config');

program
  .alias('buddy-cli config')
  .version(pJson.version);

program
  .command('set <token|url|workspace|project> [val]')
  .description('set token, url, workspace or project for future calls')
  .action(cmd.set);

program
  .command('get [token|url|workspace|project]')
  .description('view current config')
  .action(cmd.get);

program
  .command('clear')
  .description('reset config to default state')
  .action(cmd.clear);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
