const execa = require('execa');

const execSubprocess = (options = {}) => {
  const {
    onClose = () => { },
    argv = process.argv.slice(2),
    parentProcess = process,
  } = options;

  console.log('Execute subprocess as: ', argv);

  if (!argv?.length) return false;

  const subprocess = execa(argv[0], [
    ...argv.slice(1),
  ], { stdio: 'inherit' });

  subprocess.on('exit', () => onClose());
  subprocess.on('error', () => onClose());
  subprocess.on('exit', (code) => {
    parentProcess.exit(code);
  });

  return true;
};

const execCrossEnv = ({ getAppEnv, jsDir }) => {
  const getCurrentEnvArgs = () => {
    const appEnv = getAppEnv();
    const envNames = (/* process.argv[2] || */Object.keys(appEnv).join(',')).split(',');
    const currentEnvs = envNames.map((envName) => {
      return `${envName}='${appEnv[envName]}'`;
    });
    return currentEnvs;
  };

  const argv = process.argv.slice(2);
  if (!argv?.length) return false;
  if (argv[0].endsWith('.js')) {
    argv[0] = `./${jsDir}/${argv[0]}`;
    argv.unshift('node');
  }

  execSubprocess({ argv: ['cross-env', ...getCurrentEnvArgs(), ...argv] });

  return true;
};

module.exports = {
  execSubprocess,
  execCrossEnv,
};
