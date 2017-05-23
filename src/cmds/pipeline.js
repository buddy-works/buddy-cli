const config = require('../config');

module.exports = {
  ls: (opts) => {
    config.mergeOptions(opts);
    console.log('ls');
    console.log('branch', opts.branch);
    console.log('status', opts.status);
    console.log('mode', opts.mode);
  },

  inspect: (pipeline, opts) => {
    config.mergeOptions(opts);
    console.log('inspect', pipeline);
  },

  run: (pipeline, opts) => {
    config.mergeOptions(opts);
    console.log('run', pipeline);
    console.log('revision', opts.revision);
    console.log('comment', opts.comment);
    console.log('refresh', opts.refresh);
  },

  retry: (pipeline, opts) => {
    config.mergeOptions(opts);
    console.log('retry', pipeline);
  },

  cancel: (pipeline, opts) => {
    config.mergeOptions(opts);
    console.log('cancel', pipeline);
  },
};
