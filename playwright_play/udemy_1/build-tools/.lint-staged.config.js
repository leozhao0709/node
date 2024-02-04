const { merge } = require('webpack-merge');
const commonConfig = require('../build-common-config/.lint-staged.config');

module.exports = merge(commonConfig, {});