const path = require('path');
const express = require('express');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
const compiler = webpack(config);
const logUpdate = require('log-update');

const app = new express();

compiler.apply(new webpack.ProgressPlugin(function(percentage, msg) {
  logUpdate('==> ' + (percentage * 100).toFixed(2) + '%', msg);
}));

app.use(devMiddleware(compiler, config.devServer));
app.use(hotMiddleware(compiler));

app.use('*', function(req, res, next) {
  const filename = path.join(compiler.outputPath, 'index.html');
  compiler.outputFileSystem.readFile(filename, function(err, result) {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});

app.listen(config.devServer.port, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==>');
  }
});
