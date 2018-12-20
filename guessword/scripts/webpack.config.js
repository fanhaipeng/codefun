const path = require('path');

module.exports = {
  mode: 'development',
  entry: __dirname + path.sep + 'index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '.')
  }
};