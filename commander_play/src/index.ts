#!/usr/bin/env node

import { Option, Command, InvalidArgumentError } from 'commander';

const program = new Command();

program
  .name('imooc-build')
  .description('CLI play')
  .version('0.0.1', '-v, --version', 'output version');

interface globalOpts {
  debug: boolean;
  global: boolean;
}

program
  .addOption(new Option('-d, --debug').hideHelp())
  .addOption(new Option('-g, --global'));

interface test1Opts {
  first?: boolean;
  select?: boolean;
  port: string;
  a?: string;
  c: 'a' | 'b';
  env?: string;
  disableServer?: boolean;
  dollar?: number;
}

program
  .command('test1')
  .argument('<username>', 'username argument description') // arguments
  .argument('[password]', 'username argument description', 'default password') // arguments
  .addOption(new Option('-s, --select', 'select something'))
  .addOption(new Option('-p, --port <port>').default('80')) // when this options is showing, then <> must provide a value(if no default value provide), otherwise, throw error
  .addOption(new Option('-a [string]', 'test [string]')) // [] does not need provide a value, if not provide, then the value will be true(boolean)
  .addOption(new Option('--first'))
  .addOption(new Option('-c, <choice>').choices(['a', 'b'])) // can only select from choices
  .addOption(new Option('-e, --env <value>').env('ENV')) // ENV=something imooc-build test1 abc
  .addOption(
    new Option('--disable-server', 'disable servers').conflicts('port') // conflict with another option
  )
  .addOption(new Option('--dollar <amount>').preset('20').argParser(parseInt)) // parse value
  // hook
  .hook('preAction', () => {
    console.log('before test1');
  })
  .hook('postAction', () => {
    console.log('after test1');
  })
  // with args
  .action(
    // args always occupy the first part params
    (username: string, password: string, options: test1Opts, cmd: Command) => {
      console.log(username, password);
      console.log(options);
      console.log(cmd.optsWithGlobals());
    }
  );

program
  .command('test2')
  .addOption(new Option('-s, --select'))
  // without args
  .action((options: { first: boolean; select: boolean }, cmd: Command) => {
    console.log(options);
    console.log(cmd.optsWithGlobals());
  });

const parseMyInt = (value: string) => {
  const intValue = parseInt(value);
  if (isNaN(intValue)) {
    throw new InvalidArgumentError('not a valid int'); // from commander package
  }
  return intValue;
};

const collect = (value: string, prev: string[]) => {
  return [...prev, value];
};

// custom option parse
program
  .command('custom')
  .addOption(new Option('-f, --float <number>').argParser(parseFloat))
  // .addOption(new Option('-i, --int <number>').argParser(parseMyInt));
  .requiredOption('-i, --int <number>', 'integer parse', parseMyInt) // required option
  .option(
    '-c, --collect <value>',
    'collect value as an array',
    collect,
    [] as string[]
  ) // imooc-build custom -c a -c b -c c will give ['a', 'b', 'c']
  .action((options, cmd) => {
    console.log(options);
  });

program.parse();
