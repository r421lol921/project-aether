const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: 'aetherclient.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname),
    },
    compress: true,
    port: 3000,
    open: false,
  },
};
