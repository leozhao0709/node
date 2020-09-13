module.exports = {
  presets: [
    '@babel/preset-react',
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['defaults', 'ie >= 11', 'firefox >= 49'],
          node: 'current',
        },
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
  ],
  plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-object-rest-spread'],
};
