const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../packages/**/*.stories.tsx'],
  addons: [
    'storybook-dark-mode',
    '@storybook/addon-links',
    '@storybook/addon-essentials'
  ],
  framework: '@storybook/react',
  features: {
    postcss: false
  },
  webpackFinal: async (config) => {
    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        /* options: see below */
      })
    );
    return config;
  }
};
