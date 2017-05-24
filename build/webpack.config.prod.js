const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const minify = require('html-minifier').minify;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeJsPlugin = require('optimize-js-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    path.join(__dirname, '../src/index')
  ],
  output: {
    path: path.join(__dirname, '/../dist'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  cache: false,
  devtool: '#source-map',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      include: path.join(__dirname, '/../src')
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/../src/index.ejs'),
      inject: 'body'
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, '/../'),
      verbose: true,
      dry: false,
      exclude: ['.gitignore']
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      },
      beautify: false,
      comments: false
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new OptimizeJsPlugin({
      sourceMap: false
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: path.join(__dirname, '/../dist/report.html'),
      openAnalyzer: false,
      generateStatsFile: false
    })
  ]
};
