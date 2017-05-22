module.exports = {
  ls: (opts) => {
    console.log('ls');
    console.log('branch', opts.branch);
    console.log('status', opts.status);
    console.log('mode', opts.mode);
  },

  inspect: (pipeline) => {
    console.log('inspect', pipeline);
  },

  run: (pipeline, opts) => {
    console.log('run', pipeline);
    console.log('revision', opts.revision);
    console.log('comment', opts.comment);
    console.log('refresh', opts.refresh);
  },

  retry: (pipeline) => {
    console.log('retry', pipeline);
  },

  cancel: (pipeline) => {
    console.log('cancel', pipeline);
  },
};
