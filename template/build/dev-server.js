const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config');
const compiler = webpack(config);
const ora = require('ora');

const app = new express();

const devMiddleware = require('webpack-dev-middleware')(compiler, config.devServer);
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: function() {}
});

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

app.use(devMiddleware);
app.use(hotMiddleware);

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

const spinner = ora('Waiting webpack compiling');

devMiddleware.waitUntilValid(function() {
  spinner.stop();
});

app.listen(config.devServer.port, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    spinner.start();
  }
});
