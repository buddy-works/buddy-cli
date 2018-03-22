const config = require('./config');
const request = require('request');

function Client() {
  /**
   * @param {string} method
   * @param {string} url
   * @param {object} query
   * @param {object} args
   * @param {object} params
   * @param {function} done
   */
  const req = (method, url, query, args, params, done) => {
    config.mergeOptions(args);
    const token = config.get(config.KEY_TOKEN);
    const baseUrl = config.get(config.KEY_URL);
    const workspace = config.get(config.KEY_WORKSPACE);
    const project = config.get(config.KEY_PROJECT);
    const pipeline = config.get(config.KEY_PIPELINE);
    let path = url;
    if (!token) {
      done(new Error('No valid token provided'));
      return;
    }
    if (/:workspace/.test(url)) {
      if (!workspace) {
        done(new Error('No workspace provided'));
        return;
      }
      path = path.replace(/:workspace/g, workspace);
    }
    if (/:project/.test(url)) {
      if (!project) {
        done(new Error('No project provided'));
        return;
      }
      path = path.replace(/:project/g, project);
    }
    if (/:pipeline/.test(url)) {
      if (!pipeline) {
        done(new Error('No pipeline provided'));
        return;
      }
      path = path.replace(/:pipeline/g, pipeline);
    }
    const queryKeys = Object.keys(query);
    if (queryKeys.length > 0) {
      path += '?';
      queryKeys.forEach((name) => {
        if (!/\?$/.test(path)) path += '&';
        path += `${name}=${query[name]}`;
      });
    }
    request({
      url: `https://${baseUrl}${path}`,
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: params,
      json: true,
      strictSSL: false,
    }, (err, resp, body) => {
      if (err) {
        done(err);
      } else if (body !== Object(body)) {
        done(new Error('Wrong response. Do you use valid api endpoint?'));
      } else if (body && body.errors && body.errors.length > 0) {
        done(new Error(body.errors[0].message));
      } else {
        done(null, body);
      }
    });
  };
  /**
   * @param {string} url
   * @param {object} query
   * @param {object} args
   * @param {function} done
   */
  this.get = (url, query, args, done) => {
    req('GET', url, query, args, null, done);
  };
  /**
   * @param {string} url
   * @param {object} query
   * @param {object} args
   * @param {object} params
   * @param {function} done
   */
  this.patch = (url, query, args, params, done) => {
    req('PATCH', url, query, args, params, done);
  };
  /**
   * @param {string} url
   * @param {object} query
   * @param {object} args
   * @param {object} params
   * @param {function} done
   */
  this.post = (url, query, args, params, done) => {
    req('POST', url, query, args, params, done);
  };
}

function Api() {
  const client = new Client();
  /**
   * @type {number}
   */
  this.perPage = 20;
  /**
   * @param {Object} args
   * @param {Function} done
   */
  this.getWorkspaces = (args, done) => client.get('/workspaces', {}, args, done);
  /**
   * @param {function} done
   */
  this.getWorkspace = (args, done) => client.get('/workspaces/:workspace', {}, args, done);
  /**
   * @param {object} args
   * @param {function} done
   */
  this.getProjects = (args, done) => {
    const query = {
      per_page: this.perPage,
      sort_by: 'name',
      sort_direction: 'ASC',
    };
    if (!args.page) query.page = 1;
    else query.page = args.page;
    if (args.mine) query.membership = 'true';
    if (args.status !== 'ANY') query.status = args.status;
    client.get('/workspaces/:workspace/projects', query, args, done);
  };
  /**
   * @param {object} args
   * @param {function} done
   */
  this.getProject = (args, done) => client.get('/workspaces/:workspace/projects/:project', {}, args, done);
  /**
   * @param {object} args
   * @param {function} done
   */
  this.getPipelines = (args, done) => {
    const query = {
      per_page: this.perPage,
      sort_by: 'name',
      sort_direction: 'ASC',
    };
    if (!args.page) query.page = 1;
    else query.page = args.page;
    client.get('/workspaces/:workspace/projects/:project/pipelines', query, args, done);
  };
  /**
   * @param {object} args
   * @param {function} done
   */
  this.getPipeline = (args, done) => client.get('/workspaces/:workspace/projects/:project/pipelines/:pipeline', {}, args, done);
  /**
   * @param {object} args
   * @param {function} done
   */
  this.runPipeline = (args, done) => {
    const params = {};
    if (args.tag) {
      params.tag = {
        name: args.tag,
      };
    } else if (args.branch) {
      params.branch = {
        name: args.branch,
      };
    } else if (args.revision) {
      params.to_revision = {
        revision: args.revision,
      };
    } else {
      params.to_revision = {
        revision: 'HEAD',
      };
    }
    if (args.comment) params.comment = args.comment;
    if (args.refresh) params.refresh = true;
    client.post('/workspaces/:workspace/projects/:project/pipelines/:pipeline/executions', {}, args, params, done);
  };
  /**
   * @param {object} args
   * @param {function} done
   */
  this.getLastExecution = (args, done) => client.get('/workspaces/:workspace/projects/:project/pipelines/:pipeline/executions', {
    page: 1,
    per_page: 1
  }, args, (err, obj) => {
    if (err) done(err);
    else if (!obj.executions.length) done();
    else done(null, obj.executions[0]);
  });
  /**
   * @param {object} args
   * @param {function} done
   */
  this.getExecution = (args, done) => client.get(`/workspaces/:workspace/projects/:project/pipelines/:pipeline/executions/${args.execution}`, {}, args, done);
  /**
   * @param {string} executionId
   * @param {object} args
   * @param {function} done
   */
  this.cancelPipeline = (executionId, args, done) => client.patch(`/workspaces/:workspace/projects/:project/pipelines/:pipeline/executions/${executionId}`, {}, args, {operation: 'CANCEL'}, done);
  /**
   * @param {string} executionId
   * @param {object} args
   * @param {function} done
   */
  this.retryPipeline = (executionId, args, done) => client.patch(`/workspaces/:workspace/projects/:project/pipelines/:pipeline/executions/${executionId}`, {}, args, {operation: 'RETRY'}, done);
  /**
   * @param {object} args
   * @param {function} done
   */
  this.getExecutions = (args, done) => {
    const query = {
      per_page: this.perPage,
    };
    if (!args.page) query.page = 1;
    else query.page = args.page;
    client.get('/workspaces/:workspace/projects/:project/pipelines/:pipeline/executions', {}, args, done);
  };
}

module.exports = new Api();
