import path from 'node:path';
import { mergeConfig, defineConfig } from 'vitest/config';
import commonConfig from '../build-common-config/vitest.config';

export default mergeConfig(
  commonConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: [path.join(__dirname, '..', 'tests', 'tests.setup.ts')],
      include: ['tests/**/*.{spec,test}.ts(x)?'],
    },
  }),
);