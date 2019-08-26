
const path = require('path');


module.exports = {
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
};
