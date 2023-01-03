import repl from 'repl';
import { consoleTest } from './consoleTest.js';

const replSever = repl.start({
  prompt: 'app > ',
});

const context = {
  consoleTest,
};

for (const key in context) {
  replSever.context[key] = context[key];
}
