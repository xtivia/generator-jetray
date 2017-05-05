var webpack = require('webpack');
var path = require('path');

const appRoot = path.resolve('./src/app');

module.exports = {
  bail: true,
  entry: {
    // NOTE: entry settings will be overridden when invoked from gulp
    'main'  : ['./src/app/main.ts'],
  },
  output: {
    filename: '[name].js',
    // NOTE: path will be overridden when invoked from gulp
    path : path.resolve('./build'),
    devtoolModuleFilenameTemplate: '[resource-path]',
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require(path.join(__dirname,'ng_runtime','ng_runtime-manifest.json'))
    }),
    // suppress Typescript warnings when building Angular into vendor package
    //new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,appRoot),
    new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/,appRoot),
 ],
  resolve: {
    extensions: ['*','.ts', '.js']
  }, 
  module: {
    loaders: [
      // process Angular templates to inline HTML/CSS then invoke Typescript
      {test: /\.ts$/, loader: 'ts-loader!angular2-template-loader'},
      // used to load Angular HTML/CSS files for templates
      {test: /\.(html|css)$/, loader: 'raw-loader' },
    ],
    noParse: /path.join(__dirname,'node_modules', 'angular2', 'bundles')/
  },
  devtool: 'source-map'
};