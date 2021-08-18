const path = require('path');

const { getEnv } = require('./env');

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
module.exports = {
  outputDir: FSOFE_BUILD_DISTDIR,
  devServer: {
    hot: true,
    compress: true,
    // https: true,
    host: FSOFE_DEV_HOST,
    port: FSOFE_DEV_PORT,
  },
  configureWebpack: (config) => {
    // if (NODE_ENV === 'production') {
    // } else {
    // }
    const nextConfig = {
      // devtool: 'eval-source-map'
      resolve: {
        alias: {
          '@': path.resolve(__dirname, `./${FSOFE_BUILD_SRCDIR}`),
        },
      },
      entry: {
        app: `./${FSOFE_BUILD_SRCDIR}/main.ts`,
      },
      plugins: [
        // new CopyWebpackPlugin([{
        //   from: path.resolve(__dirname, `./${FSOFE_BUILD_PUBLICDIR}`),
        //   to: path.resolve(__dirname, './dist'),
        //   toType: 'dir',
        //   ignore: ['index.html', '.DS_Store']
        // }]),
      ],
    };
    return nextConfig;
  },
  chainWebpack: (config) => {
    // if (NODE_ENV === 'production') {
    // } else {
    // }
    config.plugin('html')
      .tap((args) => {
        args[0].template = path.resolve(__dirname, `./${FSOFE_BUILD_PUBLICDIR}/index.html`);
        return args;
      });
  },
};
