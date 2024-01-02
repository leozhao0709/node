const commonConfig = require('./.eslintrc.common');
const { merge } = require('webpack-merge');

module.exports = merge(commonConfig, {
  rules: {
    // 'import/extensions': ['error', 'ignorePackages'],
  },
});
