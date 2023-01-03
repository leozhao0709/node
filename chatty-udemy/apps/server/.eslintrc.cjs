const path = require('path');

module.exports = {
  extends: ['../../config/common/eslint'],
  parserOptions: {
    project: path.join(__dirname, 'tsconfig.json'),
  },
};
