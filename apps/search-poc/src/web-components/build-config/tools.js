
const path = require('path');
const webpack = require('webpack');
const kebabCase = require('lodash/kebabCase');
const upperFirst = require('lodash/upperFirst');
const camelCase = require('lodash/camelCase');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const buildMode = {
  PROD: 'production',
  DEV: 'development',
}

function validateComponentName(name) {
  if (name === camelCase(name)) {
    throw new Error(`Component name ${name} should be in camel case`);
  }
}

/**
 * Build parts of webpack config wich are common to dev and prod modes
 *
 * @param {string} componentName camelCased form of the component name.
 *                                 It's kebab case form should match the location
 *                                 of the component under `web-components` dir.
 */
function getCommonConfig (componentName) {
  validateComponentName(componentName);

  const getStyleElFuncName = `get${upperFirst(componentName)}StyleEl`;

  const fileName = kebabCase(componentName);

  const insertStyleFuncBody = `window['${getStyleElFuncName}'] = function(){return styleElement};`;
  const insertStyleFunc = new Function('styleElement', insertStyleFuncBody);

  return {
    entry: `./src/web-components/${fileName}`,
    output: {
      path: path.resolve(__dirname, '../../../dist-wc/'),
      filename: `${fileName}.bundle.min.js`
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
            insert: insertStyleFunc,
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
  }
};

/**
 * Build development mode specific parts of webpack config
 *
 * @param {string} componentName camelCased form of the component name.
 *                                 It's kebab case form should match the location
 *                                 of the component under `web-components` dir
 */
function getDevConfig(componentName) {
  validateComponentName(componentName);

  const elementTag = kebabCase(componentName);
  const title = elementTag.replace(/-/g, ' ');
  const contentPath = path.resolve(__dirname, '../../../dist-wc/');

  return {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
      path: contentPath,
    },
    devServer: {
      contentBase: contentPath,
      hot: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title,
        elementTag,
        template: './src/web-components/build-config/template.html',
        inject: 'body',
      }),
    ],
  }
}

function getProdConfig() {
  return {
    mode: 'production',
    plugins: [
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
}

function getWebpackConfig(mode, componentName) {
  const commonConfig = getCommonConfig(componentName);

  const modeConfig = mode === buildMode.PROD
    ? getProdConfig()
    : getDevConfig(componentName);

  return {
    ...commonConfig,
    ...modeConfig,
  };
};

module.exports = {
  getWebpackConfig,
  buildMode,
};
