#!/usr/bin/env node

const express = require('express');
const apiMocker = require('mocker-api');
const { execSubprocess } = require('./app-utils.include');
const { getEnv } = require('../env');

const {
  FSOFE_TEST_E2E_PORT,
  FSOFE_BUILD_DISTDIR,
  FSOFE_SERVER_SVCLIST,
} = getEnv();

const loadMockService = (options) => {
  const {
    myExpress,
  } = options;
  apiMocker(myExpress, require.resolve('./mocker-config'));
};

const launchServer = () => {
  const myExpress = express();
  const svcs = (FSOFE_SERVER_SVCLIST || '').split(',');

  const myApp = myExpress
    .use('/', express.static(FSOFE_BUILD_DISTDIR))
    .listen(FSOFE_TEST_E2E_PORT);

  if (svcs.includes('mock')) {
    console.log('About to load mock service...');
    loadMockService({ myExpress });
  }

  if (svcs.includes('subproc')) {
    console.log('About to execute subprocess...');
    const closeServer = () => myApp.close();
    execSubprocess({ argv: process.argv.slice(2), onClose: closeServer });
  }

  process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
  });
};

launchServer();
