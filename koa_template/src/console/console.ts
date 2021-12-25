import repl from 'repl';
import { test } from '@app/utils/test';

const replSever = repl.start({
  prompt: 'app > '
})

replSever.context.test = test
