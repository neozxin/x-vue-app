const { getEnv } = require('./env');

const {
  FSOFE_CONFIG_DIR,
} = getEnv();

module.exports = (() => {
  const getConfig = require(`./${FSOFE_CONFIG_DIR}/.eslintrc.include.js`);
  const config = getConfig();
  return config;
})();
