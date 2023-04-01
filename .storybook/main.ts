import { type StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../packages/**/*.stories.tsx'],
  addons: [
    'storybook-dark-mode-v7',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  }
};

export default config;
