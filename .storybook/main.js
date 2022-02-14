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
  }
};
