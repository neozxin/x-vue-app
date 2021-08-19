#!/usr/bin/env node

const express = require('express');
const execa = require('execa');
const { getEnv } = require('./env');

const {
  FSOFE_TEST_E2E_PORT,
  FSOFE_BUILD_DISTDIR,
} = getEnv();

const execSubprocess = (options) => {
  const {
    closeServer = () => { },
  } = options;
  const subprocess = execa(process.argv[2], [
    ...process.argv.slice(3),
  ], { stdio: 'inherit' });

  subprocess.on('exit', () => closeServer());
  subprocess.on('error', () => closeServer());
  subprocess.on('exit', (code) => {
    process.exit(code);
  });
};

const launchServer = () => {
  const app = express();

  const myApp = app
    .use('/', express.static(FSOFE_BUILD_DISTDIR))
    .listen(FSOFE_TEST_E2E_PORT);

  const closeServer = () => myApp.close();

  execSubprocess({ closeServer });

  process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
  });
};

launchServer();
