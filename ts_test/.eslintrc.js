const commonConfig = require('./.eslintrc.common');
const { merge } = require('webpack-merge');

module.exports = merge(commonConfig, {
  rules: {
    // 'import/extensions': ['error', 'ignorePackages'],
    // '@typescript-eslint/strict-boolean-expressions': [
    //   2,
    //   { allowNumber: false, allowString: false },
    // ],
  },
});
