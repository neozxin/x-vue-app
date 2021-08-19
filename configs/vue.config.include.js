const path = require('path');
const apiMocker = require('mocker-api');

const { getEnv } = require('../env');

// const CopyWebpackPlugin = require('copy-webpack-plugin');

const {
  // NODE_ENV,
  FSOFE_DEV_HOST,
  FSOFE_DEV_PORT,
  FSOFE_BUILD_DISTDIR,
  FSOFE_BUILD_SRCDIR,
  FSOFE_BUILD_PUBLICDIR,
} = getEnv();

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = () => {
  const config = {
    outputDir: FSOFE_BUILD_DISTDIR,
    devServer: {
      hot: true,
      compress: true,
      // https: true,
      host: FSOFE_DEV_HOST,
      port: FSOFE_DEV_PORT,
      before(app) {
        apiMocker(app, require.resolve('./mocker-config'), {
          // proxy: {
          //   '/repos/(.*)': 'https://api.github.com/',
          // },
          // changeHost: true,
        });
      },
    },
    configureWebpack: (currentConfig) => {
      // if (NODE_ENV === 'production') {
      // } else {
      // }
      const nextConfig = {
        // devtool: 'eval-source-map'
        resolve: {
          alias: {
            '@': path.resolve(__dirname, `../${FSOFE_BUILD_SRCDIR}`),
          },
        },
        entry: {
          app: `./${FSOFE_BUILD_SRCDIR}/main.ts`,
        },
        plugins: [
          // new CopyWebpackPlugin([{
          //   from: path.resolve(__dirname, `../${FSOFE_BUILD_PUBLICDIR}`),
          //   to: path.resolve(__dirname, '../dist'),
          //   toType: 'dir',
          //   ignore: ['index.html', '.DS_Store']
          // }]),
        ],
      };
      return nextConfig;
    },
    chainWebpack: (currentConfig) => {
      // if (NODE_ENV === 'production') {
      // } else {
      // }
      currentConfig.plugin('html')
        .tap((args) => {
          args[0].template = path.resolve(__dirname, `../${FSOFE_BUILD_PUBLICDIR}/index.html`);
          return args;
        });
    },
  };

  return config;
};
