const { getEnv } = require('./env');

const {
  FSOFE_TEST_STRATEGY, // '' for unit-test by default
  FSOFE_TEST_DIR,
} = getEnv();

const getModule = () => {
  const customConfigMap = {
    'unit-test': {
      testMatch: [
        `**/${FSOFE_TEST_DIR}/unit/**/*.spec.[jt]s?(x)`,
      ],
    },
    'e2e-test': {
      testMatch: [
        `**/${FSOFE_TEST_DIR}/e2e/**/*.spec.[jt]s?(x)`,
      ],
    },
    'all-tests': {
      testMatch: [
        `**/${FSOFE_TEST_DIR}/**/*.spec.[jt]s?(x)`,
      ],
    },
  };

  const config = {
    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
    ...(customConfigMap[FSOFE_TEST_STRATEGY] || customConfigMap['all-tests']),
  };

  return config;
};

module.exports = getModule();
