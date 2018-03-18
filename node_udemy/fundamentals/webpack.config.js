const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: __dirname + '/src/index.ts',
  output: {
    filename: "index.js",
    path: __dirname + '/dist/',
    publicPath: '/dist/'
  },
  node: {
    __filename: false,
    __dirname: false
  },
  target: 'node',

  // web pack dev server
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    publicPath: '/dist/',
  },

  // Enable sourcemaps for debugging webpack's output.
  // devtool: 'source-map',
  devtool: 'cheap-module-eval-source-map',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new UglifyJSPlugin()
  ]
}