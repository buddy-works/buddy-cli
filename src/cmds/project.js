const config = require('../config');
const api = require('../api');

module.exports = {
  ls: (opts) => {
    config.mergeOptions(opts);
    const each = (obj) => {
      // todo obsluzyc
      console.log('obj', obj);
    };
    const done = (err) => {
      // todo obsluzyc
      console.log('err', err);
    };
    api.getProjects(opts, each, done);
  },

  inspect: (project, opts) => {
    config.mergeOptions(opts);
    api.getProject(project, (err, obj) => {
      console.log('err', err);
      console.log('obj', obj);
      // todo obsluzyc
    });
  },
};
