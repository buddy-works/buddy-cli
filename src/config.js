const path = require('path');
const fs = require('fs');

function Config() {
  this.KEY_TOKEN = 'token';
  this.KEY_WORKSPACE = 'workspace';
  this.KEY_PROJECT = 'project';
  this.KEY_URL = 'url';
  const defaultApiUrl = 'api.buddy.works';
  const allowedKeys = [this.KEY_TOKEN, this.KEY_WORKSPACE, this.KEY_PROJECT, this.KEY_URL];
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
   * @param {object} opts
   * @returns {Config}
   */
  this.mergeOptions = (opts) => {
    for (let i = 0; i < allowedKeys.length; i += 1) {
      const key = allowedKeys[i];
      if (opts[key]) props[key] = opts[key];
    }
    return this;
  };

  disc2me();
}
module.exports = new Config();
