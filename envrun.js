#!/usr/bin/env node

const { getAppEnv, getEnv } = require('./env');

const {
  FSOFE_CONFIG_DIR,
} = getEnv();

const { execCrossEnv } = require(`./${FSOFE_CONFIG_DIR}/app-utils.include`);

execCrossEnv({ getAppEnv, jsDir: FSOFE_CONFIG_DIR });
