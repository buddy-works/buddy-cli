#!/usr/bin/env node

const program = require('commander');
const pJson = require('../package.json');
const cmd = require('../src/cmds/project');

program
  .version(pJson.version)
  .option('-t, --token [token]', 'token to authenticate request')
  .option('-u, --url [url]', 'base url for app (default: api.buddy.works)')
  .option('-w, --workspace [workspace]', 'name of a workspace in which run this command');

program
  .command('ls')
  .description('list workspace projects')
  .option('-s, --status [status]', 'filter by project status')
  .option('-m, --mine', 'show only projects in which user is a member')
  .action(cmd.ls);

program
  .command('inspect <project>')
  .alias('i')
  .description('show project details')
  .action(cmd.inspect);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
