multi_command
=============



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/multi_command.svg)](https://npmjs.org/package/multi_command)
[![Downloads/week](https://img.shields.io/npm/dw/multi_command.svg)](https://npmjs.org/package/multi_command)
[![License](https://img.shields.io/npm/l/multi_command.svg)](https://github.com/leizhao-coupa/multi_command/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g multi_command
$ multi_command COMMAND
running command...
$ multi_command (-v|--version|version)
multi_command/0.0.0 darwin-x64 node-v12.7.0
$ multi_command --help [COMMAND]
USAGE
  $ multi_command COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`multi_command hello [FILE]`](#multi_command-hello-file)
* [`multi_command help [COMMAND]`](#multi_command-help-command)

## `multi_command hello [FILE]`

describe the command here

```
USAGE
  $ multi_command hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ multi_command hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/leizhao-coupa/multi_command/blob/v0.0.0/src/commands/hello.ts)_

## `multi_command help [COMMAND]`

display help for multi_command

```
USAGE
  $ multi_command help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_
<!-- commandsstop -->
