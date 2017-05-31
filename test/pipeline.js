const mocha = require('mocha');
const expect = require('chai').expect;
const sinon = require('sinon');
const output = require('../src/output');
const ls = require('../src/cmds/pipeline/ls');
const cancel = require('../src/cmds/pipeline/cancel');
const execution = require('../src/cmds/pipeline/execution');
const executions = require('../src/cmds/pipeline/executions');
const inspect = require('../src/cmds/pipeline/inspect');
const retry = require('../src/cmds/pipeline/retry');
const run = require('../src/cmds/pipeline/run');
const config = require('../src/config');
const api = require('../src/api');

const describe = mocha.describe;
const it = mocha.it;

describe('pipeline', () => {
  describe('ls', () => {
    describe('.request()', () => {
      it('should make proper api request', () => {
        const stub = sinon.stub(api, 'getPipelines');
        ls.request({}, () => {});
        stub.restore();
        expect(stub.called).equal(true);
      });
    });
    describe('.transform()', () => {
      it('should return array', () => {
        const list = [{
          id: 1,
          name: 'a',
          last_execution_status: 'b',
        }, {
          id: 2,
          name: 'c',
          last_execution_status: 'd',
        }];
        const args = { json: true };
        let res = ls.transform(args, list);
        expect(res).be.an('array');
        expect(res.length).equal(2);
        expect(res[0]).deep.equal({
          id: list[0].id,
          display_name: list[0].name,
          status: list[0].last_execution_status,
        });
        expect(res[1]).deep.equal({
          id: list[1].id,
          display_name: list[1].name,
          status: list[1].last_execution_status,
        });
        args.json = false;
        res = ls.transform(args, list);
        expect(res).be.an('array');
        expect(res.length).equal(3);
        expect(res[0]).be.an('array');
        expect(res[0].length).equal(3);
        expect(res[0][0]).equal('ID');
        expect(res[0][1]).equal('DISPLAY NAME');
        expect(res[0][2]).equal('STATUS');
        expect(res[1]).be.an('array');
        expect(res[1].length).equal(3);
        expect(res[1][0]).equal(list[0].id);
        expect(res[1][1]).equal(list[0].name);
        expect(res[1][2]).equal(list[0].last_execution_status);
        expect(res[2][0]).equal(list[1].id);
        expect(res[2][1]).equal(list[1].name);
        expect(res[2][2]).equal(list[1].last_execution_status);
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
    describe('.request()', () => {
      it('should make proper api request', () => {
        const stub = sinon.stub(api, 'getPipeline');
        inspect.request({}, () => {});
        stub.restore();
        expect(stub.called).equal(true);
      });
    });
    describe('.transform()', () => {
      it('should return proper object', () => {
        const obj = {
          id: 1,
          name: 'a',
          html_url: 'b',
          trigger_mode: 'c',
          last_execution_status: 'd',
          create_date: 'e',
          ref_name: 'f',
          active: true,
        };
        expect(inspect.transform({}, obj)).deep.equal({
          id: obj.id,
          display_name: obj.name,
          url: obj.html_url,
          mode: obj.trigger_mode,
          status: obj.last_execution_status,
          created: obj.create_date,
          branch: obj.ref_name,
          active: obj.active,
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
  describe('run', () => {
    describe('.request()', () => {
      it('should make proper api request', () => {
        const stub = sinon.stub(api, 'runPipeline');
        run.request({}, () => {});
        stub.restore();
        expect(stub.called).equal(true);
      });
    });
    describe('.render()', () => {
      it('should render proper msg', () => {
        const stub = sinon.stub(output, 'ok');
        let msg = 'Running pipeline\n';
        msg += 'Check its status by running:\n\n';
        msg += `buddy-cli pl i ${config.get(config.KEY_PIPELINE)}`;
        const args = { json: true };
        run.render(args);
        expect(stub.called).equal(true);
        expect(stub.calledWith(args, msg));
        args.json = false;
        run.render(args);
        expect(stub.calledTwice).equal(true);
        expect(stub.calledWith(args, msg));
        stub.restore();
      });
    });
  });
  describe('retry', () => {
    describe('.request()', () => {
      it('should make proper api request', () => {
        const stub = sinon.stub(api, 'getLastExecution');
        retry.request({}, () => {});
        expect(stub.called).equal(true);
        stub.restore();
      });
      it('should return error when getLastExecution return error', (testDone) => {
        const er = new Error('mine');
        const stub = sinon.stub(api, 'getLastExecution');
        stub.callsFake((args, done) => {
          done(er);
        });
        retry.request({}, (err) => {
          stub.restore();
          expect(err).deep.equal(er);
          testDone();
        });
      });
      it('should return error when no executions', (testDone) => {
        const stub = sinon.stub(api, 'getLastExecution');
        stub.callsFake((args, done) => {
          done();
        });
        retry.request({}, (err) => {
          stub.restore();
          expect(err).be.an('error');
          expect(err.message).equal('Pipeline has no executions yet');
          testDone();
        });
      });
      it('should return error when last execution has wrong status', (testDone) => {
        const stub = sinon.stub(api, 'getLastExecution');
        stub.callsFake((args, done) => {
          done(null, {
            status: 'INPROGRESS',
          });
        });
        retry.request({}, (err) => {
          stub.restore();
          expect(err).be.an('error');
          expect(err.message).equal('Pipeline last execution is not failed or terminated');
          testDone();
        });
      });
      it('should retry pipeline when last execution has proper status', (testDone) => {
        const stub = sinon.stub(api, 'getLastExecution');
        const stub2 = sinon.stub(api, 'retryPipeline');
        stub.callsFake((args, done) => {
          done(null, {
            id: 'a',
            status: 'FAILED',
          });
        });
        stub2.callsFake((id, args, done) => {
          done();
        });
        retry.request({}, () => {
          stub.restore();
          stub2.restore();
          expect(stub.called).equal(true);
          expect(stub2.called).equal(true);
          expect(stub2.calledWith('a'));
          testDone();
        });
      });
    });
    describe('.render()', () => {
      it('should render proper msg', () => {
        const stub = sinon.stub(output, 'ok');
        let msg = 'Retrying pipeline\n';
        msg += 'Check its status by running:\n\n';
        msg += `buddy-cli pl i ${config.get(config.KEY_PIPELINE)}`;
        const args = { json: true };
        retry.render(args);
        expect(stub.called).equal(true);
        expect(stub.calledWith(args, msg));
        args.json = false;
        retry.render(args);
        expect(stub.calledTwice).equal(true);
        expect(stub.calledWith(args, msg));
        stub.restore();
      });
    });
  });
  describe('cancel', () => {
    describe('.request()', () => {
      it('should make proper api request', () => {
        const stub = sinon.stub(api, 'getLastExecution');
        cancel.request({}, () => {});
        expect(stub.called).equal(true);
        stub.restore();
      });
      it('should return error when getLastExecution return error', (testDone) => {
        const er = new Error('mine');
        const stub = sinon.stub(api, 'getLastExecution');
        stub.callsFake((args, done) => {
          done(er);
        });
        cancel.request({}, (err) => {
          stub.restore();
          expect(err).deep.equal(er);
          testDone();
        });
      });
      it('should return error when no executions', (testDone) => {
        const stub = sinon.stub(api, 'getLastExecution');
        stub.callsFake((args, done) => {
          done();
        });
        cancel.request({}, (err) => {
          stub.restore();
          expect(err).be.an('error');
          expect(err.message).equal('Pipeline has no executions yet');
          testDone();
        });
      });
      it('should return error when last execution has wrong status', (testDone) => {
        const stub = sinon.stub(api, 'getLastExecution');
        stub.callsFake((args, done) => {
          done(null, {
            status: 'FAILED',
          });
        });
        cancel.request({}, (err) => {
          stub.restore();
          expect(err).be.an('error');
          expect(err.message).equal('Pipeline is not running right now');
          testDone();
        });
      });
      it('should cancel pipeline when last execution has proper status', (testDone) => {
        const stub = sinon.stub(api, 'getLastExecution');
        const stub2 = sinon.stub(api, 'cancelPipeline');
        stub.callsFake((args, done) => {
          done(null, {
            id: 'a',
            status: 'INPROGRESS',
          });
        });
        stub2.callsFake((id, args, done) => {
          done();
        });
        cancel.request({}, () => {
          stub.restore();
          stub2.restore();
          expect(stub.called).equal(true);
          expect(stub2.called).equal(true);
          expect(stub2.calledWith('a'));
          testDone();
        });
      });
    });
    describe('.render()', () => {
      it('should render proper msg', () => {
        const stub = sinon.stub(output, 'ok');
        let msg = 'Stopping pipeline\n';
        msg += 'Check its status by running:\n\n';
        msg += `buddy-cli pl i ${config.get(config.KEY_PIPELINE)}`;
        const args = { json: true };
        cancel.render(args);
        expect(stub.called).equal(true);
        expect(stub.calledWith(args, msg));
        args.json = false;
        cancel.render(args);
        expect(stub.calledTwice).equal(true);
        expect(stub.calledWith(args, msg));
        stub.restore();
      });
    });
  });
  describe('executions', () => {
    describe('.request()', () => {
      it('should make proper api request', () => {
        const stub = sinon.stub(api, 'getExecutions');
        executions.request({}, () => {});
        expect(stub.called).equal(true);
        stub.restore();
      });
    });
    describe('.render()', () => {
      it('should render the same as output.table', () => {
        const stub = sinon.stub(output, 'table');
        const table = [[], []];
        executions.render({ json: true }, table);
        expect(stub.called).equal(true);
        expect(stub.calledWith(true, table)).equal(true);
        executions.render({ json: false }, table);
        expect(stub.calledTwice).equal(true);
        expect(stub.calledWith(false, table)).equal(true);
        stub.restore();
      });
    });
    describe('.transform()', () => {
      it('should return proper object', () => {
        const list = [{
          branch: {
            name: 'a',
          },
          to_revision: {
            revision: 'b',
          },
          from_revision: {
            revision: 'c',
          },
          creator: {
            name: 'd',
          },
          id: 1,
          html_url: 'e',
          start_date: 'f',
          finish_date: 'g',
          mode: 'h',
          refresh: true,
          status: 'i',
          comment: 'j',
        }];
        const args = { json: true };
        let res = executions.transform(args, list);
        expect(res).be.an('array');
        expect(res.length).equal(1);
        expect(res[0]).deep.equal({
          id: list[0].id,
          url: list[0].html_url,
          start_date: list[0].start_date,
          finish_date: list[0].finish_date,
          mode: list[0].mode,
          refresh: list[0].refresh,
          status: list[0].status,
          comment: list[0].comment,
          branch: list[0].branch.name,
          to_revision: list[0].to_revision.revision,
          from_revision: list[0].from_revision.revision,
          creator: list[0].creator.name,
        });
        args.json = false;
        res = executions.transform(args, list);
        expect(res).be.an('array');
        expect(res.length).equal(2);
        expect(res[0]).be.an('array');
        expect(res[0].length).equal(4);
        expect(res[0][0]).equal('ID');
        expect(res[0][1]).equal('TO REVISION');
        expect(res[0][2]).equal('STATUS');
        expect(res[0][3]).equal('FINISHED');
        expect(res[1]).be.an('array');
        expect(res[1].length).equal(4);
        expect(res[1][0]).equal(list[0].id);
        expect(res[1][1]).equal(list[0].to_revision.revision);
        expect(res[1][2]).equal(list[0].status);
        expect(res[1][3]).equal(list[0].finish_date);
      });
    });
  });
  describe('execution', () => {
    describe('.request()', () => {
      it('should make proper api request', () => {
        const s1 = sinon.stub(api, 'getLastExecution');
        const s2 = sinon.stub(api, 'getExecution');
        const args = {};
        execution.request(args, () => {});
        expect(s1.called).equal(true);
        args.execution = 'a';
        execution.request(args, () => {});
        expect(s2.called).equal(true);
        expect(s2.calledWith(args)).equal(true);
        s1.restore();
        s2.restore();
      });
    });
    describe('.render()', () => {
      it('should render the same as output.props', () => {
        const stub = sinon.stub(output, 'props');
        const o = {
          a: 'b',
          c: 'd',
        };
        execution.render({ json: true }, o);
        expect(stub.called).equal(true);
        expect(stub.calledWith(true, o)).equal(true);
        execution.render({ json: false }, o);
        expect(stub.calledTwice).equal(true);
        expect(stub.calledWith(false, o)).equal(true);
        stub.restore();
      });
    });
    describe('.transform()', () => {
      it('should return proper object', () => {
        const obj = {
          branch: {
            name: 'a',
          },
          to_revision: {
            revision: 'b',
          },
          from_revision: {
            revision: 'c',
          },
          creator: {
            name: 'd',
          },
          id: 1,
          html_url: 'e',
          start_date: 'f',
          finish_date: 'g',
          mode: 'h',
          refresh: true,
          status: 'i',
          comment: 'j',
        };
        expect(execution.transform({}, obj)).deep.equal({
          id: obj.id,
          url: obj.html_url,
          start_date: obj.start_date,
          finish_date: obj.finish_date,
          mode: obj.mode,
          refresh: obj.refresh,
          status: obj.status,
          comment: obj.comment,
          branch: obj.branch.name,
          to_revision: obj.to_revision.revision,
          from_revision: obj.from_revision.revision,
          creator: obj.creator.name,
        });
      });
    });
  });
});
