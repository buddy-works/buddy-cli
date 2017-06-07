
buddy-cli
==============================================================================
The buddy.works command line utility.

Features
------------------------------------------------------------------------------
- Running pipelines from command line
- Checking status of pipeline
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

After installation the `buddy-cli` CLI tool will be available to you.

You can call `buddy-cli -h` to find out more about all of the following commands.

In order to call any command you must first generate auth token in your buddy-works [myid](https://app.buddy.works/api-tokens)
If you are using standalone Buddy Enterprise you can do the same but in your own instance. Your token must have this scopes in order to work properly:
* WORKSPACE (Manage workspace and it's objects)
* EXECUTION_INFO (Get pipelines)
* EXECUTION_RUN (Run pipelines)

### Pipeline operations
```
buddy-cli pipeline <cmd>
```
Shortcut:
```
buddy-cli pl <cmd>
```
Pipeline parameter is id of pipeline. You can get it from pipeline list command described below.
Apart from that you must also passed token, workspace and project. 
They are mandatory arguments but you can also store them in environmental variables or through config command which enable you to shorten your commands (more below)

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
 -t, --token      Token to authenticate request
 -u, --url        Base url for app (default: api.buddy.works)
 -w, --workspace  Name of a workspace in which run this command
 -p, --project    Name of a project in which run this command
 -r, --revision   Revision from the repository that will be executed in the pipeline
 -c, --comment    Execution comment
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
 -t, --token      Token to authenticate request
 -u, --url        Base url for app (default: api.buddy.works)
 -w, --workspace  Name of a workspace in which run this command
 -p, --project    Name of a project in which run this command
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
 -t, --token      Token to authenticate request
 -u, --url        Base url for app (default: api.buddy.works)
 -w, --workspace  Name of a workspace in which run this command
 -p, --project    Name of a project in which run this command
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
 -t, --token      Token to authenticate request
 -u, --url        Base url for app (default: api.buddy.works)
 -w, --workspace  Name of a workspace in which run this command
 -p, --project    Name of a project in which run this command
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
 -t, --token      Token to authenticate request
 -u, --url        Base url for app (default: api.buddy.works)
 -w, --workspace  Name of a workspace in which run this command
 -p, --project    Name of a project in which run this command
 -e, --page       Which page to show (by default first 20 pipelines are shown)
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
 -t, --token      Token to authenticate request
 -u, --url        Base url for app (default: api.buddy.works)
 -w, --workspace  Name of a workspace in which run this command
 -p, --project    Name of a project in which run this command
 -e, --page       Which page to show (by default last 20 executions are shown)
```
#### Inspect pipeline execution
```
buddy-cli pl execution [execution]
```
Shortcut:
```
buddy-cli pl ex [execution]
```
[execution] parameter is id of the execution. If none passed last execution of the pipeline will be shown

Options:
```
 -v, --version    Show version
 -h, --help       Show help
 -j, --json       Output json
 -t, --token      Token to authenticate request
 -u, --url        Base url for app (default: api.buddy.works)
 -w, --workspace  Name of a workspace in which run this command
 -p, --project    Name of a project in which run this command
 -l, --pipeline   Id of a pipeline in which run this command
```
### Project operations
```
buddy-cli project <cmd>
```
Shortcut:
```
buddy-cli pj <cmd>
```
The same rules for arguments apply here. Some mandatory arguments (like project name) can be stored in config or in env variables.
#### List projects
```
buddy-cli pj ls
```
Options:
```
 -v, --version    Show version
 -h, --help       Show help
 -j, --json       Output json
 -t, --token      Token to authenticate request
 -u, --url        Base url for app (default: api.buddy.works)
 -w, --workspace  Name of a workspace in which run this command
 -s, --status     Filter by project status [choices: "ACTIVE", "CLOSED", "ANY"] [default: "ANY"]
 -m, --mine       Show only projects in which user is a member
 -e, --page       Which page to show (by default first 20 projects are shown)
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
 -t, --token      Token to authenticate request
 -u, --url        Base url for app (default: api.buddy.works)
 -w, --workspace  Name of a workspace in which run this command
```
### Workspace operations
```
buddy-cli workspace <cmd>
```
Shortcut:
```
buddy-cli ws <cmd>
```
The same rules for arguments apply here. Some mandatory arguments (like workspace name) can be stored in config or in env variables.
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
#### Inspect workspace
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
### Config operations
```
buddy-cli config <cmd>
```
Shortcut:
```
buddy-cli cf <cmd>
```
Config command is used to store some arguments for future use. 
For example if you often run the same pipeline again and again you can store command params in config:
```
buddy-cli cf set token my-token
buddy-cli cf set workspace my-workspace
buddy-cli cf set project my-project
buddy-cli cf set pipeline my-pipeline
```
Next time you want to run your pipeline you can just call
```
buddy-cli pl run
```
That's it!
You can always however override default config params with standard command --param
#### Set config key
```
buddy-cli cf set <key> [val]
```
key name is mandatory and can be one of these values:
* token - token to authorize the request
* workspace - name of the workspace in which you want to operate
* project - name of the project from the workspace
* pipeline - id of the pipeline in the project
* url - base url for the api endpoint. By default we point to our hosted version api (api.buddy.works). You can however point this url to your Buddy Enterprise standalone api endpoint (ip/api)
Options:
```
  -v, --version  Show version
  -h, --help     Show help
  -j, --json     Output json
```
#### Get config key
```
buddy-cli cf get [key]
```
key can be one of these values:
* token
* workspace
* project
* pipeline
* url
* all

By default all keys are returned
#### Clear config
```
buddy-cli cf clear
```
It resets config to default values (empty all keys and url pointed to api.buddy.works)

### Environmental variables
In order to store config values you can also use env variables - it is very useful if you are using buddy-cli in some continues integration (ci) or continues deployment (cd) environment. 
Indeed you can use it even in our own system @ buddy.works
These is the list of variables you can use:
* BUDDY_CLI_TOKEN
* BUDDY_CLI_WORKSPACE
* BUDDY_CLI_PROJECT
* BUDDY_CLI_PIPELINE
* BUDDY_CLI_URL

buddy-cli will use these params in order: first command line arguments, if none passed it will use env variables, next it will try to use config variables. If none is found and argument is mandatory it will throw error.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE).
