import repl from 'repl';
import path from 'path';
import dotenv from 'dotenv';
import prisma from '../prisma.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '../../env/.env.dev'),
});

const replSever = repl.start({
  prompt: 'app > ',
  ignoreUndefined: true,
});

const context = {
  prisma,
};

for (const key in context) {
  replSever.context[key] = context[key];
}
