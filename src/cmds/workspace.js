const config = require('../config');
const api = require('../api');

module.exports = {
  ls: (opts) => {
    config.mergeOptions(opts);
    api.getWorkspaces((err, obj) => {
      console.log('err', err);
      console.log('obj', obj);
      // todo obsluzyc
    });
  },

  inspect: (workspace, opts) => {
    config.mergeOptions(opts);
    api.getWorkspace(workspace, (err, obj) => {
      console.log('err', err);
      console.log('obj', obj);
      // todo obsluzyc
    });
  },
};
