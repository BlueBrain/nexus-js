
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = require('./webpack.config.common');


module.exports = {
  ...commonConfig,
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, '../../../dist-wc/'),
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../../../dist-wc/'),
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/web-components/resource-details/template.html',
      inject: 'body',
    }),
  ],
};
