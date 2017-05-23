const config = require('../config');

module.exports = {
  ls: (opts) => {
    config.mergeOptions(opts);
    console.log('ls');
    console.log('status', opts.status);
    console.log('mine', opts.mine);
  },

  inspect: (project, opts) => {
    config.mergeOptions(opts);
    console.log('inspect', project);
  },
};
