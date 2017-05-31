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
const colors = require('colors');
const pkg = require('./package.json');

const inputs = argv._;
const tmp = path.join(home, `.${pkg.name}`);

if (inputs.length === 0) {
  console.log(`${pkg.name} v${pkg.version}`.green);
} else if (inputs.length > 1) {
  console.log('Invalid arguments'.red);
} else {
  let packageInfo = {};
  packageInfo.name = inputs[0];
  packageInfo.author = os.userInfo().username;

  const spinner = ora('Downloading template')
  spinner.start();

  if (fs.exists(tmp)) {
    rm(tmp);
  }

  const downloadRepo = function() {
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

  downloadRepo().then(function() {
    spinner.stop();
    console.log('Download template successfully'.green);
    fse.copySync(path.join(tmp, 'template'), `./${packageInfo.name}`);
    let packageFile = `./${packageInfo.name}/package.json`;
    let packageFileText = fs.readFileSync(packageFile, 'utf8');
    let packageFileObject = JSON.parse(packageFileText);
    packageFileObject.name = packageInfo.name;
    packageFileObject.author = packageInfo.author;
    packageFileText = JSON.stringify(packageFileObject, null, 2);
    console.log('All things has done'.green);
    console.log('Please run following commands manually'.green);
    console.log(`$ cd ${packageInfo.name}`.cyan);
    console.log(`$ yarn`.cyan);
  }).catch(function(err) {
    throw err;
  });
}
