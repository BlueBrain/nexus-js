
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
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
      rules: [{
        test:/\.css$/,
        use: [{
          loader: 'style-loader',
          options: {
            injectType: 'singletonStyleTag',
            insert: function (styleElement) {
              window.getResourceDetailsStyleEl = function() {
                return styleElement;
              }
            },
          },
        },
          'css-loader',
        ]
    }, {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              "@babel/preset-react",
              "@babel/preset-typescript"
            ],
            plugins: [
              ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
              "@babel/proposal-class-properties",
              "@babel/proposal-object-rest-spread",
            ]
          }
      }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/web-components/resource-details/template.html',
      inject: 'body',
    }),
  ],
};
