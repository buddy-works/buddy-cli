
module.exports.command = 'workspace <cmd>';

module.exports.aliases = 'ws';

module.exports.describe = 'workspace list, inspect';

module.exports.builder = (yargs) => {
  this.yargs = yargs;
  return yargs.commandDir('workspace');
};

module.exports.handler = () => this.yargs.showHelp();
