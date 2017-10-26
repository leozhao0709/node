const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  // entry: __dirname + '/src/index.tsx',
  entry: __dirname + '/src/playground/redux-101.tsx',
  output: {
    filename: "bundle.js",
    path: __dirname + '/dist/',
    publicPath: '/dist/'
  },

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
      },

      // css, scss loader
      {
        test: /\.s?css$/,
        loaders: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
      },

      // photos and files loader
      {
        test: /\.png|.jpg|.jpeg$/,
        // loader: 'file-loader?limit=5000&name=public/images/[hash:8].[name].[ext]'
        use: [{
          loader: 'file-loader',
          options: {
            name: '[hash:8].[name].[ext]',
            publicPath: '/dist/',
            outputPath: 'public/images/'
          }
        }]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new UglifyJSPlugin()
  ]
}