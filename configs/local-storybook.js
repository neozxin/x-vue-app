#!/usr/bin/env node

const { execSubprocess } = require('./app-utils.include');
const { getEnv } = require('../env');

const {
  FSOFE_DEV_STORYBOOK_PORT,
} = getEnv();

const execLint = (options = {}) => {
  const {
    argv,
  } = options;
  execSubprocess({
    argv: [
      ...(argv?.length) ? argv : [
        'start-storybook',
        '-p',
        FSOFE_DEV_STORYBOOK_PORT,
      ],
    ],
  });
};

execLint({ argv: process.argv.slice(2) });
