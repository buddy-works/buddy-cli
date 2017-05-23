const config = require('../config');
const output = require('../output');

module.exports = {
  set: (key, val) => {
    if (!config.isAllowedKey(key)) {
      output.error('Wrong key');
    } else {
      config.set(key, val);
      output.ok('Key saved');
    }
  },

  clear: () => {
    config.clear();
    output.ok('Cleared');
  },

  get: (key) => {
    if (!key) {
      let txt = '';
      const keys = config.getAllKeys();
      for (let i = 0; i < keys.length; i += 1) {
        if (i > 0) txt += '\n';
        const k = keys[i];
        const val = config.get(k);
        txt += `${k}: \t`;
        if (!val) {
          txt += output.red('not defined');
        } else {
          txt += output.green(val);
        }
      }
      output.dsl(txt);
    } else if (!config.isAllowedKey(key)) {
      output.error('Wrong key');
    } else {
      const val = config.get(key);
      let txt = `${key}: `;
      if (!val) {
        txt += output.red('not defined');
      } else {
        txt += output.green(val);
      }
      output.dsl(txt);
    }
  },
};
