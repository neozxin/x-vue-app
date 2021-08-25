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
  const defaultSrcDirs = [FSOFE_CONFIG_DIR, FSOFE_BUILD_SRCDIR, FSOFE_TEST_E2E_DIR, '*.js'];
  execSubprocess({
    argv: [
      // 'vue-cli-service',
      // 'lint',
      'eslint',
      ...(argv?.length) ? argv : [
        '--fix',
        '--ext',
        '.js,.jsx,.vue,.ts,.tsx',
        '-f',
        'codeframe',
        ...defaultSrcDirs,
      ],
    ],
  });
};

execLint({ argv: process.argv.slice(2) });
