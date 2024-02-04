import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import checker from 'vite-plugin-checker';
import { imagetools } from 'vite-imagetools';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  plugins: [
    checker({ typescript: { tsconfigPath: 'tsconfig.build.json' } }),
    imagetools(),
    tsconfigPaths(),
  ],
});
