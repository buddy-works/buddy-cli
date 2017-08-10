module.exports.command = 'alias <cmd>';

module.exports.aliases = 'al';

module.exports.describe = 'get, set or clear aliases';

module.exports.builder = (yargs) => {
  this.yargs = yargs;
  return yargs.commandDir('alias');
};

module.exports.handler = () => this.yargs.showHelp();
