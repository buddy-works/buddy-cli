module.exports.command = 'project <cmd>';

module.exports.aliases = 'pj';

module.exports.describe = 'project list, inspect';

module.exports.builder = (yargs) => {
  this.yargs = yargs;
  return yargs.commandDir('project');
};

module.exports.handler = () => this.yargs.showHelp();
