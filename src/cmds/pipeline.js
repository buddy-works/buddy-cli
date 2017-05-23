const config = require('../config');
const api = require('../api');

module.exports = {
  ls: (opts) => {
    config.mergeOptions(opts);
    // todo start table
    const each = (obj) => {
      console.log('obj', obj);
      // todo show this row
    };
    const done = (err) => {
      console.log('err', err);
      // todo show err if exists
    };
    api.getPipelines(opts, each, done);
  },

  inspect: (pipeline, opts) => {
    config.mergeOptions(opts);
    api.getPipeline(pipeline, (err, obj) => {
      console.log('err', err);
      console.log('obj', obj);
      // todo show err lub success
    });
  },

  run: (pipeline, opts) => {
    config.mergeOptions(opts);
    api.runPipeline(pipeline, opts, (err, obj) => {
      console.log('err', err);
      console.log('obj', obj);
      // todo show err lub success
    });
  },

  retry: (pipeline, opts) => {
    config.mergeOptions(opts);
    api.retryPipeline(pipeline, (err, obj) => {
      console.log('err', err);
      console.log('obj', obj);
      // todo show err lub success
    });
  },

  cancel: (pipeline, opts) => {
    config.mergeOptions(opts);
    api.cancelPipeline(pipeline, (err, obj) => {
      console.log('err', err);
      console.log('obj', obj);
      // todo show err lub success
    });
  },

  executions: (pipeline, opts) => {
    config.mergeOptions(opts);
    const each = (obj) => {
      console.log('obj', obj);
      // todo obsluzyc
    };
    const done = (err) => {
      console.log('err', err);
      // todo obsluzyc
    };
    api.getExecutions(pipeline, each, done);
  },
};
