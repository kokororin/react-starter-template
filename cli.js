#!/usr/bin/env node

require('es6-promise').polyfill();

const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const argv = require('yargs').argv;
const os = require('os');
const download = require('download-git-repo');
const ora = require('ora');
const home = require('user-home');
const rm = require('rimraf').sync;
const util = require('util');
const chalk = require('chalk');
const pkg = require('./package.json');

const inputs = argv._;
const tmp = path.join(home, `.${pkg.name}`);

function logInfo() {
  const msg = util.format.apply(util.format, arguments);
  console.log(chalk.white(`  ${msg}`));
}

function logError(message) {
  if (message instanceof Error) {
    message = message.message.trim()
  }
  const msg = util.format.apply(util.format, arguments);
  console.error(chalk.red(`  ${msg}`));
  process.exit(1);
}

function downloadRepo() {
  return new Promise(function(resolve, reject) {
    download(`${pkg.author}/${pkg.name}`, tmp, { clone: false }, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}


if (inputs.length === 0) {
  logInfo(`${pkg.name} v${pkg.version}`);
  process.exit(0);
} else if (inputs.length > 1) {
  logError('Invalid arguments');
}


let packageInfo = {};
packageInfo.name = inputs[0];
packageInfo.author = os.userInfo().username;

const spinner = ora('Downloading template')
spinner.start();

if (fs.exists(tmp)) {
  rm(tmp);
}

downloadRepo().then(function() {
  spinner.stop();
  logInfo('Download template successfully.\n');
  fse.copySync(path.join(tmp, 'template'), `./${packageInfo.name}`);
  let packageFile = `./${packageInfo.name}/package.json`;
  let packageFileText = fs.readFileSync(packageFile, 'utf8');
  let packageFileObject = JSON.parse(packageFileText);
  packageFileObject.name = packageInfo.name;
  packageFileObject.author = packageInfo.author;
  packageFileText = JSON.stringify(packageFileObject, null, 2);
  logInfo(`Generated "${packageInfo.name}".\n`);
  logInfo('To get started:\n');
  logInfo(`      cd ${packageInfo.name}`);
  logInfo('      yarn');
  logInfo('      npm start');
}).catch(function(err) {
  logInfo('\n  Error occurred:');
  logError(err);
});
