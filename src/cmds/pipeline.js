module.exports.command = 'pipeline <cmd>';

module.exports.aliases = 'pl';

module.exports.describe = 'pipeline list, inspect, operations';

module.exports.builder = (yargs) => {
  this.yargs = yargs;
  return yargs.commandDir('pipeline');
};

module.exports.handler = () => this.yargs.showHelp();
