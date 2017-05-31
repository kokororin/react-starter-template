const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const minify = require('html-minifier').minify;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeJsPlugin = require('optimize-js-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkWebpackPlugin = require('html-webpack-inline-chunk-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    path.join(__dirname, '../src/index')
  ],
  output: {
    path: path.join(__dirname, '/../dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js',
    publicPath: '/'
  },
  cache: false,
  devtool: '#source-map',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      include: path.join(__dirname, '/../src')
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          'postcss-loader'
        ]
      })
    }, {
      test: /\.scss/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      })
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/../src/index.ejs'),
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new InlineChunkWebpackPlugin({
      inlineChunks: ['manifest']
    }),
    new ExtractTextPlugin('[name].[contenthash].css'),
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
