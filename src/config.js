const path = require('path');
const fs = require('fs');

function Config() {
  this.KEY_TOKEN = 'token';
  this.KEY_WORKSPACE = 'workspace';
  this.KEY_PROJECT = 'project';
  this.KEY_PIPELINE = 'pipeline';
  this.KEY_URL = 'url';
  this.ENV_TOKEN = 'BUDDY_CLI_TOKEN';
  this.ENV_WORKSPACE = 'BUDDY_CLI_WORKSPACE';
  this.ENV_PROJECT = 'BUDDY_CLI_PROJECT';
  this.ENV_PIPELINE = 'BUDDY_CLI_PIPELINE';
  this.ENV_URL = 'BUDDY_CLI_URL';
  const defaultApiUrl = 'api.buddy.works';
  const allowedKeys = [
    this.KEY_TOKEN,
    this.KEY_WORKSPACE,
    this.KEY_PROJECT,
    this.KEY_PIPELINE,
    this.KEY_URL,
  ];
  let props = {};
  const configPath = path.normalize(path.join(__dirname, '..', 'config.json'));
  const me2disc = () => fs.writeFileSync(configPath, JSON.stringify(props));
  const disc2me = () => {
    try {
      const s = fs.statSync(configPath);
      if (s.isFile()) {
        props = JSON.parse(fs.readFileSync(configPath));
      }
    } catch (e) {
      props = {};
    }
  };
  /**
   * @returns {Array}
   */
  this.getAllKeys = () => allowedKeys;
  /**
   * @param {string} key
   * @returns {boolean}
   */
  this.isAllowedKey = key => allowedKeys.indexOf(key) >= 0;
  /**
   * @param {string} key
   * @param {string} [val]
   * @returns {Config}
   */
  this.set = (key, val) => {
    if (!this.isAllowedKey(key)) {
      throw new Error('Wrong key');
    }
    if (!val) delete props[key];
    else props[key] = val;
    me2disc();
    return this;
  };
  /**
   * @returns {Config}
   */
  this.clear = () => {
    props = {};
    me2disc();
    return this;
  };
  /**
   * @param {string} key
   * @returns {string}
   */
  this.get = (key) => {
    if (!this.isAllowedKey(key)) {
      throw new Error('Wrong key');
    }
    if (!props[key]) {
      if (key === this.KEY_URL) return defaultApiUrl;
      return '';
    }
    return props[key];
  };
  /**
   * @returns {object}
   */
  this.getAll = () => {
    const res = {};
    for (let i = 0; i < allowedKeys.length; i += 1) {
      const key = allowedKeys[i];
      res[key] = !props[key] ? '' : props[key];
    }
    return res;
  };
  /**
   * @param {object} opts
   * @returns {Config}
   */
  this.mergeOptions = (opts) => {
    if (opts[this.KEY_TOKEN]) {
      props[this.KEY_TOKEN] = opts[this.KEY_TOKEN];
    } else if (process.env[this.ENV_TOKEN]) {
      props[this.KEY_TOKEN] = process.env[this.ENV_TOKEN];
    }
    if (opts[this.KEY_URL]) {
      props[this.KEY_URL] = opts[this.KEY_URL];
    } else if (process.env[this.ENV_URL]) {
      props[this.KEY_URL] = process.env[this.ENV_URL];
    }
    if (opts[this.KEY_WORKSPACE]) {
      props[this.KEY_WORKSPACE] = opts[this.KEY_WORKSPACE];
    } else if (process.env[this.ENV_WORKSPACE]) {
      props[this.KEY_WORKSPACE] = process.env[this.ENV_WORKSPACE];
    }
    if (opts[this.KEY_PROJECT]) {
      props[this.KEY_PROJECT] = opts[this.KEY_PROJECT];
    } else if (process.env[this.ENV_PROJECT]) {
      props[this.KEY_PROJECT] = process.env[this.ENV_PROJECT];
    }
    if (opts[this.KEY_PIPELINE]) {
      props[this.KEY_PIPELINE] = opts[this.KEY_PIPELINE];
    } else if (process.env[this.ENV_PIPELINE]) {
      props[this.KEY_PIPELINE] = process.env[this.ENV_PIPELINE];
    }
    return this;
  };

  disc2me();
}
module.exports = new Config();
