import { spawn } from 'node:child_process';
import pkg from '../../package.json' assert { type: 'json' };
import fs from 'node:fs';
import path from 'node:path';

const buildSrc = () => {
  const childProcess = spawn(
    'pnpm',
    [
      'tsc',
      '-p',
      'scripts/esm/tsconfig.build.json',
      '&&',
      'tsc-alias',
      '-p',
      'scripts/esm/tsconfig.build.json',
    ],
    { shell: true }
  );

  childProcess.stdout.pipe(process.stdout);
  childProcess.stderr.pipe(process.stderr);
};

const createPackageJson = () => {
  const cjsPkg = {
    ...pkg,
    type: 'module',
  };

  const distCjsDir = path.resolve(__dirname, '../../dist/esm');
  const pkgPath = path.resolve(distCjsDir, 'package.json');

  if (!fs.existsSync(distCjsDir)) {
    fs.mkdirSync(distCjsDir, { recursive: true });
  }

  fs.writeFileSync(pkgPath, JSON.stringify(cjsPkg, null, 2));
};

const buildCjs = () => {
  buildSrc();
  createPackageJson();
};

buildCjs();
