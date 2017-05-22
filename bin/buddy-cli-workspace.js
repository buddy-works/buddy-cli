#!/usr/bin/env node

const program = require('commander');
const pJson = require('../package.json');
const cmd = require('../src/cmds/workspace');

program
  .version(pJson.version)
  .option('-t, --token [token]', 'token to authenticate request')
  .option('-u, --url [url]', 'base url for app (default: api.buddy.works)');

program
  .command('ls')
  .description('list all user workspaces')
  .action(cmd.ls);

program
  .command('inspect <workspace>')
  .alias('i')
  .description('show workspace details')
  .action(cmd.inspect);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
