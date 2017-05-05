const webpack = require('webpack');
const path = require('path');
const NgcWebpack = require('ngc-webpack');

const appRoot = path.resolve('./src/app');

module.exports = {
  bail: true,
  entry: {
    // NOTE: entry setting will be overridden when invoked from gulp
    'main' : './src/app/main_aot.ts',
  },
  output: {
    filename: '[name].js',
    // NOTE: path will be overridden when invoked from gulp
    path : path.resolve('./build'),
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require(path.join(__dirname,'ng_runtime','ng_runtime-manifest.json'))
    }),
    // suppress Typescript warnings when building Angular into vendor package
    //new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,appRoot),
    new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/,appRoot),
    // invoke Angular AOT compiler
    new NgcWebpack.NgcWebpackPlugin({tsConfig: path.join(__dirname,'tsconfig_aot.json')}),
  ],
  resolve: {
    extensions: ['*','.ts', '.js']
  }, 
  module: {
    loaders: [
      {test: /\.ts$/, loader: 'ts-loader'},
      {test: /\.(html|css)$/, loader: 'raw-loader' },
    ],
    noParse: /path.join(__dirname,'node_modules', 'angular2', 'bundles')/
  },
};