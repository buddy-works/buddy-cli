module.exports = {
  ls: (opts) => {
    console.log('ls');
    console.log('status', opts.status);
    console.log('mine', opts.mine);
  },

  inspect: (project) => {
    console.log('inspect', project);
  },
};
