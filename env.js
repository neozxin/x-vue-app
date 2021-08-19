const getAppEnv = () => {
  const defaultAppEnv = {
    FSOFE_CONFIG_DIR: 'configs',
    FSOFE_TEST_STRATEGY: '',
    FSOFE_TEST_E2E_PORT: '8081',
    FSOFE_TEST_E2E_DIR: 'tests/e2e',
    FSOFE_DEV_HOST: 'localhost', // '0.0.0.0' for accessible externally(issue: hot-loader)
    FSOFE_DEV_PORT: '8080',
    FSOFE_BUILD_DISTDIR: 'dist',
    FSOFE_BUILD_SRCDIR: 'src',
    FSOFE_BUILD_PUBLICDIR: 'public',
    FSOFE_SERVER_SVCLIST: '',
  };
  const appEnv = Object.entries(process.env).reduce((env, [k, v]) => {
    return k in defaultAppEnv ? { ...env, [k]: v } : env;
  }, { ...defaultAppEnv });
  return appEnv;
};

const getEnv = () => {
  const env = {
    ...getAppEnv(),
    ...process.env,
  };
  return env;
};

module.exports = {
  getAppEnv,
  getEnv,
};
