const path = require('path');
const webpack = require('webpack');

const postcssLoaderOption = {
  loader: 'postcss-loader',
  options: {
    config: {
      path: path.join(__dirname, 'postcss.config.js')
    }
  }
};

module.exports = {
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.join(__dirname, '/../src')
    }
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      enforce: 'pre',
      include: path.join(__dirname, '/../src'),
      loader: 'eslint-loader'
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        postcssLoaderOption
      ]
    }, {
      test: /\.scss/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
        postcssLoaderOption
      ]
    }, {
      test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot)(\?|\?[a-z0-9]+)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'images/[hash].[ext]'
        }
      }]
    }]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      autobind: 'autobind-decorator'
    })
  ]
};
