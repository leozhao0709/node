const path = require('path');
const commonConfig = require('../build-common-config/.eslintrc');
const { merge } = require('webpack-merge');

module.exports = merge(commonConfig, {
  parserOptions: {
    project: path.join(__dirname, '../tsconfig.eslint.json'),
  },
  extends: [
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    'react/prop-types': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
});
