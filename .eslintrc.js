const { getEnv } = require('./env');

const {
  FSOFE_TEST_DIR,
} = getEnv();

const getModule = () => {
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
      '@typescript-eslint/no-empty-function': 'off',
    },
    overrides: [
      {
        files: [
          `**/${FSOFE_TEST_DIR}/**/*.spec.{j,t}s?(x)`,
        ],
        env: {
          jest: true,
        },
      },
      {
        files: [
          `**/${FSOFE_TEST_DIR}/e2e/**/*.test.{j,t}s?(x)`,
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
          './*.js',
        ],
        rules: {
          '@typescript-eslint/no-var-requires': 'off',
          'no-param-reassign': 'off',
        },
      },
    ],
  };

  return config;
};

module.exports = getModule();
