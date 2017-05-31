const mocha = require('mocha');
const expect = require('chai').expect;
const cfg = require('../src/config');
const utils = require('./utils');

const describe = mocha.describe;
const it = mocha.it;

describe('config', () => {
  describe('.set()', () => {
    it('should throw error while using wrong key', () => {
      expect(cfg.set.bind(cfg, 'key', 'val')).throw('Wrong key');
    });

    it('should set value in object', () => {
      const token = utils.randomString(10);
      const url = utils.randomString(10);
      const workspace = utils.randomString(10);
      const project = utils.randomString(10);
      const pipeline = utils.randomString(10);
      cfg.set(cfg.KEY_TOKEN, token);
      cfg.set(cfg.KEY_URL, url);
      cfg.set(cfg.KEY_WORKSPACE, workspace);
      cfg.set(cfg.KEY_PROJECT, project);
      cfg.set(cfg.KEY_PIPELINE, pipeline);
      expect(cfg.get(cfg.KEY_TOKEN)).equal(token);
      expect(cfg.get(cfg.KEY_URL)).equal(url);
      expect(cfg.get(cfg.KEY_WORKSPACE)).equal(workspace);
      expect(cfg.get(cfg.KEY_PROJECT)).equal(project);
      expect(cfg.get(cfg.KEY_PIPELINE)).equal(pipeline);
    });

    it('should save value on disc', () => {
      const key = cfg.KEY_TOKEN;
      const val = utils.randomString(10);
      cfg.set(key, val);
      const cfg2 = new cfg.constructor();
      expect(cfg2.get(key)).equal(val);
    });
  });

  describe('.isAllowedKey()', () => {
    it('should return true for every valid key', () => {
      expect(cfg.isAllowedKey(cfg.KEY_URL)).equal(true);
      expect(cfg.isAllowedKey(cfg.KEY_TOKEN)).equal(true);
      expect(cfg.isAllowedKey(cfg.KEY_WORKSPACE)).equal(true);
      expect(cfg.isAllowedKey(cfg.KEY_PROJECT)).equal(true);
      expect(cfg.isAllowedKey(cfg.KEY_PIPELINE)).equal(true);
    });

    it('should return false for every invalid key', () => {
      expect(cfg.isAllowedKey('key')).equal(false);
    });
  });

  describe('.getAllKeys()', () => {
    it('should return all keys', () => {
      const arr = cfg.getAllKeys();
      expect(arr).instanceof(Array);
      expect(arr).members([
        cfg.KEY_PROJECT,
        cfg.KEY_WORKSPACE,
        cfg.KEY_TOKEN,
        cfg.KEY_URL,
        cfg.KEY_PIPELINE,
      ]);
      expect(arr).lengthOf(5);
    });
  });

  describe('.clear()', () => {
    it('should clear all keys in object', () => {
      cfg.set(cfg.KEY_URL, utils.randomString(10));
      cfg.set(cfg.KEY_PROJECT, utils.randomString(10));
      cfg.set(cfg.KEY_TOKEN, utils.randomString(10));
      cfg.set(cfg.KEY_WORKSPACE, utils.randomString(10));
      cfg.set(cfg.KEY_PIPELINE, utils.randomString(10));
      cfg.clear();
      expect(cfg.get(cfg.KEY_TOKEN)).equal('');
      expect(cfg.get(cfg.KEY_PROJECT)).equal('');
      expect(cfg.get(cfg.KEY_WORKSPACE)).equal('');
      expect(cfg.get(cfg.KEY_URL)).equal('api.buddy.works');
      expect(cfg.get(cfg.KEY_PIPELINE)).equal('');
    });

    it('should clear all keys on disc', () => {
      cfg.set(cfg.KEY_URL, utils.randomString(10));
      cfg.set(cfg.KEY_PROJECT, utils.randomString(10));
      cfg.set(cfg.KEY_TOKEN, utils.randomString(10));
      cfg.set(cfg.KEY_WORKSPACE, utils.randomString(10));
      cfg.set(cfg.KEY_PIPELINE, utils.randomString(10));
      cfg.clear();
      const cfg2 = new cfg.constructor();
      expect(cfg2.get(cfg.KEY_TOKEN)).equal('');
      expect(cfg2.get(cfg.KEY_PROJECT)).equal('');
      expect(cfg2.get(cfg.KEY_WORKSPACE)).equal('');
      expect(cfg2.get(cfg.KEY_PIPELINE)).equal('');
      expect(cfg2.get(cfg.KEY_URL)).equal('api.buddy.works');
    });
  });

  describe('.mergeOptions()', () => {
    it('should set all keys in object', () => {
      const opts = {};
      opts[cfg.KEY_TOKEN] = utils.randomString(10);
      opts[cfg.KEY_URL] = utils.randomString(10);
      opts[cfg.KEY_PROJECT] = utils.randomString(10);
      opts[cfg.KEY_WORKSPACE] = utils.randomString(10);
      opts[cfg.KEY_PIPELINE] = utils.randomString(10);
      cfg.mergeOptions(opts);
      expect(cfg.get(cfg.KEY_TOKEN)).equal(opts[cfg.KEY_TOKEN]);
      expect(cfg.get(cfg.KEY_URL)).equal(opts[cfg.KEY_URL]);
      expect(cfg.get(cfg.KEY_PROJECT)).equal(opts[cfg.KEY_PROJECT]);
      expect(cfg.get(cfg.KEY_WORKSPACE)).equal(opts[cfg.KEY_WORKSPACE]);
      expect(cfg.get(cfg.KEY_PIPELINE)).equal(opts[cfg.KEY_PIPELINE]);
    });

    it('must not set other keys', () => {
      const opts = {};
      opts.key = utils.randomString(10);
      cfg.mergeOptions(opts);
      expect(cfg.get.bind(cfg, 'key')).throw('Wrong key');
    });

    it('must not save value on disc', () => {
      const opts = {};
      opts[cfg.KEY_TOKEN] = utils.randomString(10);
      opts[cfg.KEY_URL] = utils.randomString(10);
      opts[cfg.KEY_PROJECT] = utils.randomString(10);
      opts[cfg.KEY_WORKSPACE] = utils.randomString(10);
      opts[cfg.KEY_PIPELINE] = utils.randomString(10);
      cfg.mergeOptions(opts);
      const cfg2 = new cfg.constructor();
      expect(cfg2.get(cfg.KEY_TOKEN)).not.equal(opts[cfg.KEY_TOKEN]);
      expect(cfg2.get(cfg.KEY_URL)).not.equal(opts[cfg.KEY_URL]);
      expect(cfg2.get(cfg.KEY_PROJECT)).not.equal(opts[cfg.KEY_PROJECT]);
      expect(cfg2.get(cfg.KEY_WORKSPACE)).not.equal(opts[cfg.KEY_WORKSPACE]);
      expect(cfg2.get(cfg.KEY_PIPELINE)).not.equal(opts[cfg.KEY_PIPELINE]);
    });

    it('should merge keys from env variables', () => {
      process.env[cfg.ENV_TOKEN] = utils.randomString(10);
      process.env[cfg.ENV_URL] = utils.randomString(10);
      process.env[cfg.ENV_PROJECT] = utils.randomString(10);
      process.env[cfg.ENV_WORKSPACE] = utils.randomString(10);
      process.env[cfg.ENV_PIPELINE] = utils.randomString(10);
      cfg.mergeOptions({});
      expect(cfg.get(cfg.KEY_TOKEN)).equal(process.env[cfg.ENV_TOKEN]);
      expect(cfg.get(cfg.KEY_URL)).equal(process.env[cfg.ENV_URL]);
      expect(cfg.get(cfg.KEY_PROJECT)).equal(process.env[cfg.ENV_PROJECT]);
      expect(cfg.get(cfg.KEY_WORKSPACE)).equal(process.env[cfg.ENV_WORKSPACE]);
      expect(cfg.get(cfg.KEY_PIPELINE)).equal(process.env[cfg.ENV_PIPELINE]);
    });
  });
});
