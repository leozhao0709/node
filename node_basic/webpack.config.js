const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.ts',
  },
  target: 'node',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    // libraryTarget: 'umd',
  },
  resolve: {
    alias: {
      app: path.resolve(__dirname, 'src'),
      tests: path.resolve(__dirname, 'tests'),
    },
    extensions: ['.tsx', '.ts', '.js', '.svg', '.png', 'jpg', 'gif'],
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(ts|tsx)$/,
            exclude: /(node_modules|tests)/,
            use: 'babel-loader',
          },
          {
            test: /\.(png|jpg|gif)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    // new CopyPlugin({ patterns: [{ from: '', to: '' }] }),
  ],
};
