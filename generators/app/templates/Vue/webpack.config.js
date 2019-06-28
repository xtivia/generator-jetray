const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// temporarily suppress babel plugin warning
process.noDeprecation = true;

module.exports = {
  entry: './src/main.js',
  output: {
    filename: "app.js",
    path: path.join(__dirname, "build"),
    devtoolModuleFilenameTemplate: '[resource-path]',
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require(path.join(__dirname,'vue_runtime','vue_runtime-manifest.json'))
    }),
    // avoid issues in things that test for the value of NODE_ENV
    new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('production')}})
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devtool: 'source-map'
};
