const commonConfig = require('./.eslintrc.common.cjs');
const { merge } = require('webpack-merge');

module.exports = merge(commonConfig, {
  rules: {
    'import/extensions': ['error', 'ignorePackages'],
  },
});
