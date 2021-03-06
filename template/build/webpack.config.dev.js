const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const ip = require('ip');

module.exports = {
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    inline: true,
    port: 3000,
    host: '0.0.0.0',
    publicPath: '/',
    noInfo: false,
    hot: true,
    stats: {
      colors: true
    },
    quiet: true
  },
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    'whatwg-fetch',
    './src/index'
  ],
  cache: true,
  devtool: '#eval-source-map',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: ['react-hot-loader/webpack', 'babel-loader'],
      include: path.join(__dirname, '/../src')
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader'
      ]
    }, {
      test: /\.scss/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/../src/index.ejs'),
      inject: 'body',
      minify: false
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:3000' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [
          'You application is running here http://localhost:3000',
          'You can open http://' + ip.address() + ':3000 on your mobile devices'
        ]
      }
    }),
  ]
};
