const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  target: ['web', 'es5'],
  entry: {
    index: './src/index.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(process.cwd(), 'dist'),
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
    // library: {
    //   type: 'umd',
    // },
  },
  resolve: {
    alias: {
      '@app': path.resolve(process.cwd(), 'src'),
      '@tests': path.resolve(process.cwd(), 'tests'),
      react: path.resolve('./node_modules/react'), // useful when you link local package to debug
    },
    // only these suffix file can import
    extensions: ['.tsx', '.ts', '.js', '.svg', '.png', '.jpg', '.gif'],
    // // point the module load path, can add extra path
    // modules: [path.resolve(__dirname, './node_modules')],
  },
  module: {
    rules: [
      // {
      //   test: /\.(ts|tsx)$/,
      //   exclude: /(node_modules|tests)/,
      //   use: 'babel-loader?cacheDirectory',
      // },
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|tests)/,
        loader: 'ts-loader',
        options: { configFile: 'tsconfig.build.json', projectReferences: true },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: 'images/[name][ext]',
        },
        // // url-loader and file-loader is deprecated since webpack 5 and css-loader 6
        // use: [
        //   {
        //     loader: 'url-loader',
        //     options: {
        //       limit: 10 * 1024, // 10kb,
        //       outputPath: '/assets/',
        //       // publicPath: 'https://cdn.abc.com'
        //     },
        //   },
        // ],
      },
      {
        test: /\.(ttf|woff|woff2)/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'index',
      filename: 'index.html',
      template: 'public/index.html',
      chunks: ['index'], // only enject index.js to template
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    // // define different enject var, if use ts, then you need declare these varaible in type file, can only enject js code snippet
    // new webpack.DefinePlugin({
    //   API_BASE_URL:
    //     process.env.NODE_ENV === 'production'
    //       ? JSON.stringify('https://api.prod.com')
    //       : JSON.stringify('https://api.example.com'),
    // }),
  ],
};
