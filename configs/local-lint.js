#!/usr/bin/env node

const { execSubprocess } = require('./app-utils.include');
const { getEnv } = require('../env');

const {
  FSOFE_CONFIG_DIR,
  FSOFE_BUILD_SRCDIR,
  FSOFE_TEST_E2E_DIR,
} = getEnv();

const execLint = (options = {}) => {
  const {
    argv,
  } = options;
  const defaultArgv = [FSOFE_CONFIG_DIR, FSOFE_BUILD_SRCDIR, FSOFE_TEST_E2E_DIR, '*.js'];
  execSubprocess({
    argv: [
      'vue-cli-service',
      'lint',
      ...(argv?.length) ? argv : defaultArgv,
    ],
  });
};

execLint({ argv: process.argv.slice(2) });
