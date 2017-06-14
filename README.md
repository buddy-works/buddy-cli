
buddy-cli
==============================================================================
[![buddy pipeline](https://app.buddy.works/hi-there/buddy-cli/pipelines/pipeline/53698/badge.svg?token=04cdb54a84fa521b80a12a17978d9f482cb8b62484528a0c6dcae50ea1c5add2 "buddy pipeline")](https://app.buddy.works/hi-there/buddy-cli/pipelines/pipeline/53698)
[![GitHub issues](https://img.shields.io/github/issues/buddy-works/buddy-cli.svg)](https://github.com/buddy-works/buddy-cli/issues)
[![GitHub stars](https://img.shields.io/github/stars/buddy-works/buddy-cli.svg)](https://github.com/buddy-works/buddy-cli/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/buddy-works/buddy-cli/master/LICENSE)

The Buddy CLI is used to manage Buddy.Works pipelines from the terminal.

Features
------------------------------------------------------------------------------
- Run pipelines from the command line
- Check pipeline status
- List executions
- List pipelines
- List projects
- List workspaces

Installation
------------------------------------------------------------------------------
```
npm install -g buddyworks-cli
```

Usage
------------------------------------------------------------------------------

The tool will be immediately available after the installation.
You can call `buddy-cli -h` to find out more about commands available.

In order to call any command, you must first generate an auth token in your Buddy.Works [my-id](https://app.buddy.works/api-tokens) settings.
If you are using Buddy Enterprise (standalone) you need to do the same, but in your own instance. Your token must have these scopes in order to work properly:

* WORKSPACE – Manage workspace and its objects
* EXECUTION_INFO – Get pipelines
* EXECUTION_RUN – Run pipelines

### Pipeline operations
```
buddy-cli pipeline <cmd>
```
Shortcut:
```
buddy-cli pl <cmd>
```
The `pipeline` parameter is the ID of the pipeline. You can get it from the pipeline list command described below.
Apart from that you also need the passed token, workspace and project. 

The arguments are mandatory, but you can store them in Buddy.Works as environment variables or through a config command that will enable you to shorten your commands (more below).

#### Run pipeline
```
buddy-cli pl run [pipeline]
```
Shortcut:
```
buddy-cli pl r [pipeline]
```
Options:
```
 -v, --version    Show version
 -h, --help       Show help
 -j, --json       Output json
 -t, --token      The token used to authenticate the request
 -u, --url        The base URL for the app (default: api.buddy.works)
 -w, --workspace  The name of the workspace in which the command is run
 -p, --project    The name of the project in which the command is run
 -r, --revision   The revision from the repository that will be executed in the pipeline
 -c, --comment    The execution comment
 -f, --refresh    Execute from scratch
```

#### Retry pipeline
```
buddy-cli pl retry [pipeline]
```
Shortcut:
```
buddy-cli pl t [pipeline]
```
Options:
```
 -v, --version    Show version
 -h, --help       Show help
 -j, --json       Output json
 -t, --token      The token used to authenticate the request
 -u, --url        The base URL for the app (default: api.buddy.works)
 -w, --workspace  The name of the workspace in which the command is run
 -p, --project    The name of the project in which the command is run
```

#### Cancel pipeline
```
buddy-cli pl cancel [pipeline]
```
Shortcut:
```
buddy-cli pl c [pipeline]
```
Options:
```
 -v, --version    Show version
 -h, --help       Show help
 -j, --json       Output json
 -t, --token      The token used to authenticate the request
 -u, --url        The base URL for the app (default: api.buddy.works)
 -w, --workspace  The name of the workspace in which the command is run
 -p, --project    The name of the project in which the command is run
```

#### Inspect pipeline
```
buddy-cli pl inspect [pipeline]
```
Shortcut:
```
buddy-cli pl i [pipeline]
```
Options:
```
 -v, --version    Show version
 -h, --help       Show help
 -j, --json       Output json
 -t, --token      The token used to authenticate the request
 -u, --url        The base URL for the app (default: api.buddy.works)
 -w, --workspace  The name of the workspace in which the command is run
 -p, --project    The name of the project in which the command is run
```
#### List pipelines
```
buddy-cli pl ls
``` 
Options:
```
 -v, --version    Show version
 -h, --help       Show help
 -j, --json       Output json
 -t, --token      The token used to authenticate the request
 -u, --url        The base URL for the app (default: api.buddy.works)
 -w, --workspace  The name of the workspace in which the command is run
 -p, --project    The name of the project in which the command is run
 -e, --page       Which page to show (by default, the first 20 pipelines are shown)
```

#### List pipeline executions
```
buddy-cli pl executions [pipeline]
```
Shortcut:
```
buddy-cli pl exs [pipeline]
```
Options:
```
 -v, --version    Show version
 -h, --help       Show help
 -j, --json       Output json
 -t, --token      The token used to authenticate the request
 -u, --url        The base URL for the app (default: api.buddy.works)
 -w, --workspace  The name of the workspace in which the command is run
 -p, --project    The name of the project in which the command is run
 -e, --page       The number of the pages to display (by default, the first 20 pipelines are shown)
```

#### Inspect pipeline execution
```
buddy-cli pl execution [execution]
```
Shortcut:
```
buddy-cli pl ex [execution]
```
The `[execution]` parameter is the ID of the execution. If none has passed, the last execution of the pipeline will be shown.

Options:
```
 -v, --version    Show version
 -h, --help       Show help
 -j, --json       Output json
 -t, --token      The token used to authenticate the request
 -u, --url        The base URL for the app (default: api.buddy.works)
 -w, --workspace  The name of the workspace in which the command is run
 -p, --project    The name of the project in which the command is run
 -l, --pipeline   The ID of the pipeline in which the command is run
```

---

### Project operations
```
buddy-cli project <cmd>
```
Shortcut:
```
buddy-cli pj <cmd>
```
The same rules for arguments apply here: some mandatory arguments, like project name, can be stored in the config or env variables.

#### List projects
```
buddy-cli pj ls
```
Options:
```
 -v, --version    Show version
 -h, --help       Show help
 -j, --json       Output json
 -t, --token      The token used to authenticate the request
 -u, --url        The base URL for the app (default: api.buddy.works)
 -w, --workspace  The name of the workspace in which the command is run
 -s, --status     Filter by project status [choices: "ACTIVE", "CLOSED", "ANY"] [default: "ANY"]
 -m, --mine       Show only the projects to which the user belongs
 -e, --page       Which page to show (by default, the first 20 pipelines are shown)
```

#### Inspect project
```
buddy-cli pj inspect [project]
```
Shortcut:
```
buddy-cli pj i [project]
```
Options:
```
 -v, --version    Show version
 -h, --help       Show help
 -j, --json       Output json
 -t, --token      The token used to authenticate the request
 -u, --url        The base URL for the app (default: api.buddy.works)
 -w, --workspace  The name of the workspace in which the command is run
```

---

### Workspace operations
```
buddy-cli workspace <cmd>
```
Shortcut:
```
buddy-cli ws <cmd>
```
The same rules for arguments apply here: some mandatory arguments, like workspace name, can be stored in the config or in env variables.

#### List workspaces
```
buddy-cli ws ls
```
Options:
```
 -v, --version  Show version
 -h, --help     Show help
 -j, --json     Output json
 -t, --token    Token to authenticate request
 -u, --url      Base url for app (default: api.buddy.works)
```

### Inspect workspace
```
buddy-cli ws inspect [workspace]
```
Shortcut:
```
buddy-cli ws i [workspace]
```
Options:
```
 -v, --version  Show version
 -h, --help     Show help
 -j, --json     Output json
 -t, --token    Token to authenticate request
 -u, --url      Base url for app (default: api.buddy.works)
```

---

### Config operations
```
buddy-cli config <cmd>
```
Shortcut:
```
buddy-cli cf <cmd>
```
The `config` command is used to store some arguments for future use. 
For example, if you often run the same pipeline, you can store the command params in config:
```
buddy-cli cf set token my-token
buddy-cli cf set workspace my-workspace
buddy-cli cf set project my-project
buddy-cli cf set pipeline my-pipeline
```
The next time you'll want to run your pipeline you can, just call
```
buddy-cli pl run
```
Please mind you can override the default config params with a standard `command --param`

#### Set config key
```
buddy-cli cf set <key> [val]
```
The key name is mandatory and can be one of the following values:
* token – The token used to authenticate the request
* workspace – The name of the workspace in which the command is run
* project – The name of the project in the workspace
* pipeline – The ID of the pipeline in the project
* url – The base URL for the API endpoint. By default, we point to our hosted version  of the API (api.buddy.works), but you can also point this URL to your Buddy Enterprise (standalone) API endpoint (ip/api).

Options:
```
  -v, --version  Show version
  -h, --help     Show help
  -j, --json     Output json
```

### Get config key
```
buddy-cli cf get [key]
```
The key can be one of the following values:
* token
* workspace
* project
* pipeline
* url
* all

By default, all keys are returned.

#### Clear config
```
buddy-cli cf clear
```
This command resets the config to default values (empties all keys and resets the URL to `api.buddy.works`)

---

### Environment variables
You can use environment variables to store your config values. This feature is very useful if you want to usie buddy-cli in a Continuous Integration (CI) and/or Continuous Deployment (CD) environment. 

This is the list of variables you can use:
* BUDDY_CLI_TOKEN
* BUDDY_CLI_WORKSPACE
* BUDDY_CLI_PROJECT
* BUDDY_CLI_PIPELINE
* BUDDY_CLI_URL

Buddy CLI uses parameters in the following order:

1. Command line arguments
2. Environment variables
3. Config variables

If none of the above is found and the argument is mandatory, it will throw an error.

Environment variables are also [available directly](https://buddy.works/knowledge/deployments/how-use-environment-variables) in the Buddy.Works system.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE).
