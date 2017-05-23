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
      const key = cfg.KEY_TOKEN;
      const val = utils.randomString(10);
      expect(cfg.set(key, val).get(key)).equal(val);
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
    });

    it('should return false for every invalid key', () => {
      expect(cfg.isAllowedKey('key')).equal(false);
    });
  });

  describe('.getAllKeys()', () => {
    it('should return all keys', () => {
      const arr = cfg.getAllKeys();
      expect(arr).instanceof(Array);
      expect(arr).members([cfg.KEY_PROJECT, cfg.KEY_WORKSPACE, cfg.KEY_TOKEN, cfg.KEY_URL]);
      expect(arr).lengthOf(4);
    });
  });

  describe('.clear()', () => {
    it('should clear all keys in object', () => {
      cfg.set(cfg.KEY_URL, utils.randomString(10));
      cfg.set(cfg.KEY_PROJECT, utils.randomString(10));
      cfg.set(cfg.KEY_TOKEN, utils.randomString(10));
      cfg.set(cfg.KEY_WORKSPACE, utils.randomString(10));
      cfg.clear();
      expect(cfg.get(cfg.KEY_TOKEN)).equal('');
      expect(cfg.get(cfg.KEY_PROJECT)).equal('');
      expect(cfg.get(cfg.KEY_WORKSPACE)).equal('');
      expect(cfg.get(cfg.KEY_URL)).equal('api.buddy.works');
    });

    it('should clear all keys on disc', () => {
      cfg.set(cfg.KEY_URL, utils.randomString(10));
      cfg.set(cfg.KEY_PROJECT, utils.randomString(10));
      cfg.set(cfg.KEY_TOKEN, utils.randomString(10));
      cfg.set(cfg.KEY_WORKSPACE, utils.randomString(10));
      cfg.clear();
      const cfg2 = new cfg.constructor();
      expect(cfg2.get(cfg.KEY_TOKEN)).equal('');
      expect(cfg2.get(cfg.KEY_PROJECT)).equal('');
      expect(cfg2.get(cfg.KEY_WORKSPACE)).equal('');
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
      cfg.mergeOptions(opts);
      expect(cfg.get(cfg.KEY_TOKEN)).equal(opts[cfg.KEY_TOKEN]);
      expect(cfg.get(cfg.KEY_URL)).equal(opts[cfg.KEY_URL]);
      expect(cfg.get(cfg.KEY_PROJECT)).equal(opts[cfg.KEY_PROJECT]);
      expect(cfg.get(cfg.KEY_WORKSPACE)).equal(opts[cfg.KEY_WORKSPACE]);
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
      cfg.mergeOptions(opts);
      const cfg2 = new cfg.constructor();
      expect(cfg2.get(cfg.KEY_TOKEN)).not.equal(opts[cfg.KEY_TOKEN]);
    });
  });
});
