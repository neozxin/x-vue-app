const { getEnv } = require('../env');

const {
  FSOFE_TEST_E2E_DIR,
  FSOFE_CONFIG_DIR,
} = getEnv();

module.exports = () => {
  const config = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      'plugin:vue/essential',
      '@vue/airbnb',
      '@vue/typescript/recommended',
    ],
    parserOptions: {
      ecmaVersion: 2020,
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'arrow-body-style': 'off',
      '@typescript-eslint/no-empty-function': 'warn',
      'linebreak-style': ['warn', process.platform === 'win32' ? 'windows' : 'unix'],
    },
    overrides: [
      {
        files: [
          './**/*.spec.{j,t}s?(x)',
        ],
        env: {
          jest: true,
        },
        rules: {
          'import/no-extraneous-dependencies': 'off',
        },
      },
      { // dev only
        files: [
          `./${FSOFE_TEST_E2E_DIR}/**/*.test.{j,t}s?(x)`,
        ],
        env: {
          mocha: true,
        },
        rules: {
          '@typescript-eslint/no-var-requires': 'off',
        },
      },
      {
        files: [
          `./${FSOFE_CONFIG_DIR}/*.js`,
        ],
        rules: {
          '@typescript-eslint/no-var-requires': 'off',
          'no-param-reassign': 'off',
          'import/no-extraneous-dependencies': 'off',
        },
      },
      {
        files: [
          './*.js',
        ],
        rules: {
          '@typescript-eslint/no-var-requires': 'off',
          'import/no-dynamic-require': 'off',
          'global-require': 'off',
        },
      },
    ],
  };
  return config;
};
