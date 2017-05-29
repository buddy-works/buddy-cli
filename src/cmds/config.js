module.exports.command = 'config <cmd>';

module.exports.aliases = 'cf';

module.exports.describe = 'get, set or clear config';

module.exports.builder = (yargs) => {
  this.yargs = yargs;
  return yargs.commandDir('config');
};

module.exports.handler = () => this.yargs.showHelp();
