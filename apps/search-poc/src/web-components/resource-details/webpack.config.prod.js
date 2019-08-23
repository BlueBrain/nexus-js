
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
  mode: 'production',
  entry: './src/web-components/resource-details',
  output: {
      path: path.resolve(__dirname, '../../../dist-wc/'),
      filename: 'resource-details.bundle.min.js'
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
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          test: /\.(css|scss|less)$/,
          enforce: true
        }
      }
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new TerserPlugin({
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {},
          mangle: true,
          module: false,
          output: {
            comments: false,
          },
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
        },
      }),
    ],
  },
};