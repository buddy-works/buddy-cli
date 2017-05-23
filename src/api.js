const config = require('./config');
const request = require('request');

function Client() {
  /**
   * @param {string} method
   * @param {string} url
   * @param {object} params
   * @param {function} done
   */
  const req = (method, url, params, done) => {
    const token = config.get(config.KEY_TOKEN);
    const baseUrl = config.get(config.KEY_URL);
    const workspace = config.get(config.KEY_WORKSPACE);
    const project = config.get(config.KEY_PROJECT);
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
    request({
      url: `https://${baseUrl}${path}`,
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: params,
      json: true,
    }, (err, resp, body) => {
      console.log('err', err);
      console.log('body', body);
      done();
    });
  };
  /**
   * @param {string} url
   * @param {function} done
   */
  this.get = (url, done) => {
    req('GET', url, null, done);
  };
  /**
   * @param {string} url
   * @param {object} params
   * @param {function} done
   */
  this.patch = (url, params, done) => {
    req('PATCH', url, params, done);
  };
  /**
   * @param {string} url
   * @param {object} params
   * @param {function} done
   */
  this.post = (url, params, done) => {
    req('POST', url, params, done);
  };
}

function Api() {
  const client = new Client();
  /**
   * @param {Function} done
   */
  this.getWorkspaces = done => client.get('/workspaces', done);
  /**
   * @param {string} workspace
   * @param {function} done
   */
  this.getWorkspace = (workspace, done) => client.get(`/workspaces/${workspace}`, done);
  /**
   * @param {object} opts
   * @param {function} each
   * @param {function} done
   */
  this.getProjects = (opts, each, done) => {
    // todo obsluz paramsy status, mine
    // todo w petli pobierac dopoki sa
    client.get('/workspaces/:workspace/projects', done);
  };
  /**
   * @param {string} project
   * @param {function} done
   */
  this.getProject = (project, done) => client.get(`/workspaces/:workspace/projects/${project}`, done);
  /**
   * @param {object} opts
   * @param {function} each
   * @param {function} done
   */
  this.getPipelines = (opts, each, done) => {
    // todo obsluz parametry branch, status, mode
    // todo w petli trzeba pobierac dopoki nie pobiore wszystkich
    client.get('/workspaces/:workspace/projects/:project/pipelines', done);
  };
  /**
   * @param {string} pipeline
   * @param {function} done
   */
  this.getPipeline = (pipeline, done) => client.get(`/workspaces/:workspace/projects/:project/pipelines/${pipeline}`, done);
  /**
   * @param {string} pipeline
   * @param {object} opts
   * @param {function} done
   */
  this.runPipeline = (pipeline, opts, done) => {
    const params = {
      to_revision: 'HEAD',
    };
    if (opts.revision) params.to_revision = opts.revision;
    if (opts.comment) params.comment = opts.comment;
    if (opts.refresh) params.refresh = true;
    client.post(`/workspaces/:workspace/projects/:project/pipelines/${pipeline}/executions`, params, done);
  };
  /**
   * @param {string} pipeline
   * @param {function} done
   */
  this.cancelPipeline = (pipeline, done) => {
    // todo wpierw pobiez ost execution potem zrob na nim cancel
    done();
  };
  /**
   * @param {string} pipeline
   * @param {function} done
   */
  this.retryPipeline = (pipeline, done) => {
    // todo wpierw pobiez ost execution potem zrob na nim retry
    done();
  };
  /**
   * @param {string} pipeline
   * @param {function} each
   * @param {function} done
   */
  this.getExecutions = (pipeline, each, done) => {
    // todo w petli trzeba pobierac dopoki nie pobiore wszystkich
    client.get(`/workspaces/:workspace/projects/:project/pipelines/${pipeline}/executions`, done);
  };
}

module.exports = new Api();
