module.exports = {
  stories: ['../packages/**/*.stories.tsx'],
  addons: [
    'storybook-dark-mode',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-essentials'
  ],
  framework: '@storybook/react',
  features: {
    storyStoreV7: true
  },
  core: {
    builder: 'webpack5'
  }
};
