const mocha = require('mocha');
const output = require('../src/output');
const sinon = require('sinon');
const ls = require('../src/cmds/workspace/ls');
const api = require('../src/api');
const inspect = require('../src/cmds/workspace/inspect');
const { expect } = require('chai');

const { describe } = mocha;
const { it } = mocha;

describe('workspace', () => {
  describe('ls', () => {
    describe('.request()', () => {
      it('should make proper api request', () => {
        const stub = sinon.stub(api, 'getWorkspaces');
        ls.request({}, () => {});
        expect(stub.called).equal(true);
        stub.restore();
      });
    });
    describe('.transform()', () => {
      it('should returned plain array for json', () => {
        const workspaces = [{
          domain: 'a',
        }, {
          domain: 'b',
        }];
        const args = { json: true };
        const result = ls.transform(args, workspaces);
        expect(result).to.be.an('array');
        expect(result.length).equal(workspaces.length);
        expect(result[0]).equal(workspaces[0].domain);
        expect(result[1]).equal(workspaces[1].domain);
      });
      it('should returned embeded array for text', () => {
        const workspaces = [{
          domain: 'a',
        }, {
          domain: 'b',
        }];
        const args = { json: false };
        const result = ls.transform(args, workspaces);
        expect(result).to.be.an('array');
        expect(result.length).equal(workspaces.length + 1);
        expect(result[0]).to.be.an('array');
        expect(result[0].length).equal(1);
        expect(result[0][0]).equal('NAME');
        expect(result[1]).to.be.an('array');
        expect(result[1].length).equal(1);
        expect(result[1][0]).equal(workspaces[0].domain);
      });
    });
    describe('.render()', () => {
      it('should pass params to output.table', () => {
        const stub = sinon.stub(output, 'table');
        const table = [[], []];
        ls.render({ json: true }, table);
        expect(stub.called).equal(true);
        expect(stub.calledWith(true, table)).equal(true);
        ls.render({ json: false }, table);
        expect(stub.calledTwice).equal(true);
        expect(stub.calledWith(false, table)).equal(true);
        stub.restore();
      });
    });
  });
  describe('inspect', () => {
    describe('.transform()', () => {
      it('should return json object', () => {
        const obj = {
          domain: 'terefere',
          name: 'abc',
          html_url: 'test',
          frozen: true,
          create_date: 'adqwerqw',
        };
        expect(inspect.transform({}, obj)).deep.equal({
          name: obj.domain,
          display_name: obj.name,
          url: obj.html_url,
          frozen: obj.frozen,
          created: obj.create_date,
        });
      });
    });
    describe('.request()', () => {
      it('should make proper api request', () => {
        const stub = sinon.stub(api, 'getWorkspace');
        inspect.request({}, () => {});
        expect(stub.called).equal(true);
        stub.restore();
      });
    });
    describe('.render()', () => {
      it('should pass params to output.props', () => {
        const stub = sinon.stub(output, 'props');
        const obj = { a: 1, b: 'c' };
        inspect.render({ json: true }, obj);
        expect(stub.called).equal(true);
        expect(stub.calledWith(true, obj)).equal(true);
        inspect.render({ json: false }, obj);
        expect(stub.calledTwice).equal(true);
        expect(stub.calledWith(false, obj)).equal(true);
        stub.restore();
      });
    });
  });
});
