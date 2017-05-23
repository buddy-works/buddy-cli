#!/usr/bin/env node

const program = require('commander');
const pJson = require('../package.json');
const cmd = require('../src/cmds/pipeline');

program
  .alias('buddy-cli pipeline')
  .version(pJson.version)
  .option('-t, --token [token]', 'token to authenticate request')
  .option('-u, --url [url]', 'base url for app (default: api.buddy.works)')
  .option('-w, --workspace [workspace]', 'name of a workspace in which run this command')
  .option('-p, --project [project]', 'name of a project in which run this command');

program
  .command('ls')
  .description('list project pipelines')
  .option('-b, --branch [branch]', 'filter by pipeline branch')
  .option('-s, --status [status]', 'filter by pipeline status')
  .option('-m, --mode [mode]', 'filter by pipeline trigger mode')
  .action(cmd.ls);

program
  .command('inspect <pipeline>')
  .alias('i')
  .description('show pipeline details')
  .action(cmd.inspect);

program
  .command('run <pipeline>')
  .description('execute given pipeline')
  .option('-r, --revision [revision]', 'revision from the repository that will be executed in the pipeline')
  .option('-c, --comment [comment]', 'execution comment')
  .option('-h, --refresh', 'execute from scratch')
  .action(cmd.run);

program
  .command('cancel <pipeline>')
  .description('cancel execution of a given pipeline')
  .action(cmd.cancel);

program
  .command('retry <pipeline>')
  .description('retry execution of a given pipeline')
  .action(cmd.retry);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
