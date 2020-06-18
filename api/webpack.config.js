const path = require('path');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './api/index.ts',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{ test: /\.ts$/, use: 'ts-loader' }],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
