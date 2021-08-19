const { getEnv } = require('../env');

const {
  FSOFE_TEST_STRATEGY, // '' for unit-test by default
  FSOFE_TEST_E2E_DIR,
  FSOFE_BUILD_SRCDIR,
} = getEnv();

module.exports = () => {
  const customConfigMap = {
    'unit-test': {
      testMatch: [
        `**/${FSOFE_BUILD_SRCDIR}/**/*.spec.[jt]s?(x)`,
      ],
    },
    'e2e-test': {
      testMatch: [
        `**/${FSOFE_TEST_E2E_DIR}/**/*.spec.[jt]s?(x)`,
      ],
    },
    'all-tests': {
      testMatch: [
        '**/*.spec.[jt]s?(x)',
      ],
    },
  };

  const config = {
    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
    ...(customConfigMap[FSOFE_TEST_STRATEGY] || customConfigMap['all-tests']),
  };

  return config;
};
