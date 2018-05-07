const mocha = require('mocha');
const output = require('../src/output');
const cliui = require('cliui');
const sinon = require('sinon');
const chalk = require('chalk');
const { expect } = require('chai');

const { describe } = mocha;
const { it } = mocha;

const json2text = obj => JSON.stringify(obj, null, 2);

describe('output', () => {
  describe('.props()', () => {
    it('should output json', () => {
      const stub = sinon.stub(console, 'log');
      const obj = {
        prop1: 'val1',
        prop2: true,
        prop3: null,
      };
      output.props(true, obj);
      stub.restore();
      expect(stub.calledOnce).equal(true);
      expect(stub.calledWith(json2text(obj))).equal(true);
    });
    it('should output formatted text', () => {
      const stub = sinon.stub(console, 'log');
      const obj = {
        prop1: 'val1',
        prop_2: true,
        prop3: null,
      };
      let txt = 'KEY\tVALUE\nProp1 \tval1\nProp 2 \ttrue\nProp3 \t';
      const ui = cliui({
        width: 100,
      });
      ui.div(txt);
      txt = ui.toString();
      output.props(false, obj);
      stub.restore();
      expect(stub.calledOnce).equal(true);
      expect(stub.calledWith(txt)).equal(true);
    });
  });
  describe('.table()', () => {
    it('should output json', () => {
      const stub = sinon.stub(console, 'log');
      const obj = [{
        prop1: 'val 1',
        prop2: false,
        prop_3: null,
      }];
      output.table(true, obj);
      stub.restore();
      expect(stub.calledOnce).equal(true);
      expect(stub.calledWith(json2text(obj))).equal(true);
    });
    it('should output formatted text', () => {
      const stub = sinon.stub(console, 'log');
      const obj = [['NAME 1', 'NAME 2'], ['VAL 1', true], ['', false]];
      let txt = 'NAME 1 \tNAME 2\nVAL 1 \ttrue\n \tfalse';
      const ui = cliui({
        width: 100,
      });
      ui.div(txt);
      txt = ui.toString();
      output.table(false, obj);
      stub.restore();
      expect(stub.calledOnce).equal(true);
      expect(stub.calledWith(txt)).equal(true);
    });
  });
  describe('.ok()', () => {
    it('should output json', () => {
      const stub = sinon.stub(console, 'log');
      output.ok(true, 'message');
      stub.restore();
      expect(stub.calledOnce).equal(true);
      expect(stub.calledWith(json2text({ success: true, message: 'message' }))).equal(true);
    });
    it('should output green text', () => {
      const stub = sinon.stub(console, 'log');
      output.ok(false, 'message');
      stub.restore();
      expect(stub.calledOnce).equal(true);
      expect(stub.calledWith(chalk.green('message'))).equal(true);
    });
  });
  describe('.error()', () => {
    it('should output json', () => {
      const stub = sinon.stub(console, 'log');
      const stub2 = sinon.stub(process, 'exit');
      output.error(true, 'message');
      stub.restore();
      stub2.restore();
      expect(stub.calledOnce).equal(true);
      expect(stub.calledWith(json2text({ success: false, message: 'message' }))).equal(true);
      expect(stub2.calledOnce).equal(true);
      expect(stub2.calledWith(1)).equal(true);
    });
    it('should output red text', () => {
      const stub = sinon.stub(console, 'log');
      const stub2 = sinon.stub(process, 'exit');
      output.error(false, 'message');
      stub.restore();
      stub2.restore();
      expect(stub.calledOnce).equal(true);
      expect(stub.calledWith(chalk.red('message'))).equal(true);
      expect(stub2.calledOnce).equal(true);
      expect(stub2.calledWith(1)).equal(true);
    });
  });
});
