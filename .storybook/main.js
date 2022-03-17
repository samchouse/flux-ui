const tsconfigPaths = require('vite-tsconfig-paths').default;

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
  core: {
    builder: 'storybook-builder-vite'
  },
  async viteFinal(config) {
    config.plugins.push(tsconfigPaths());
    return config;
  }
};
