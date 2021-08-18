const getEnv = () => {
  const env = {
    FSOFE_TEST_STRATEGY: '',
    FSOFE_TEST_E2E_PORT: '8081',
    FSOFE_TEST_DIR: 'tests',
    FSOFE_DEV_HOST: 'localhost', // '0.0.0.0' for accessible externally(issue: hot-loader)
    FSOFE_DEV_PORT: '8080',
    FSOFE_BUILD_DISTDIR: 'dist',
    FSOFE_BUILD_SRCDIR: 'src',
    FSOFE_BUILD_PUBLICDIR: 'public',
    ...process.env,
  };
  return env;
};

module.exports = {
  getEnv,
};
