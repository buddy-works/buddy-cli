const mocha = require('mocha');
const expect = require('chai').expect;
const ls = require('../../src/cmds/project/ls');
const inspect = require('../../src/cmds/project/inspect');
const output = require('../../src/output');
const sinon = require('sinon');

const describe = mocha.describe;
const it = mocha.it;

describe('unit', () => {
  describe('project', () => {
    describe('ls', () => {
      describe('.transform()', () => {
        it('should return plain array for json', () => {
          const list = [{
            name: '1',
            status: 'a',
          }, {
            name: '2',
            status: 'b',
          }];
          const result = ls.transform({ json: true }, list);
          expect(result).be.an('array');
          expect(result.length).equal(2);
          expect(result[0].name).equal(list[0].name);
          expect(result[0].status).equal(list[0].status);
          expect(result[1].name).equal(list[1].name);
          expect(result[1].status).equal(list[1].status);
        });
        it('should return embed array for text', () => {
          const list = [{
            name: '1',
            status: 'a',
          }, {
            name: '2',
            status: 'b',
          }];
          const result = ls.transform({ json: false }, list);
          expect(result).be.an('array');
          expect(result.length).equal(3);
          expect(result[0]).be.an('array');
          expect(result[1]).be.an('array');
          expect(result[2]).be.an('array');
          expect(result[0].length).equal(2);
          expect(result[1].length).equal(2);
          expect(result[2].length).equal(2);
          expect(result[0][0]).equal('NAME');
          expect(result[0][1]).equal('STATUS');
          expect(result[1][0]).equal(list[0].name);
          expect(result[1][1]).equal(list[0].status);
          expect(result[2][0]).equal(list[1].name);
          expect(result[2][1]).equal(list[1].status);
        });
      });
      describe('.render()', () => {
        it('should render the same as output.table', () => {
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
        it('should return proper object', () => {
          const obj = {
            name: 'a',
            display_name: 'b',
            html_url: 'c',
            status: 'd',
            create_date: 'e',
          };
          expect(inspect.transform({}, obj)).deep.equal({
            name: obj.name,
            display_name: obj.display_name,
            url: obj.html_url,
            status: obj.status,
            created: obj.create_date,
          });
        });
      });
      describe('.render()', () => {
        it('should render the same as output.props', () => {
          const stub = sinon.stub(output, 'props');
          const o = {
            a: 'b',
            c: 'd',
          };
          inspect.render({ json: true }, o);
          expect(stub.called).equal(true);
          expect(stub.calledWith(true, o)).equal(true);
          inspect.render({ json: false }, o);
          expect(stub.calledTwice).equal(true);
          expect(stub.calledWith(false, o)).equal(true);
          stub.restore();
        });
      });
    });
  });
});
