const { merge } = require('webpack-merge');
const commonConfig = require('../build-common-config/.prettierrc');

/** @type {import("prettier").Config} */
module.exports = merge(commonConfig, {});