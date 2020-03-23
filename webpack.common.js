const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/client/index.js',
  module: {
    rules: [
      // Style rules
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // JS Rules
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/view/index.html',
      filename: './index.html',
    }),
  ],
};
