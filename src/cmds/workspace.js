const config = require('../config');

module.exports = {
  ls: (opts) => {
    config.mergeOptions(opts);
    console.log('ls');
  },

  inspect: (workspace, opts) => {
    config.mergeOptions(opts);
    console.log('inspect', workspace);
  },
};
