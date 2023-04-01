import { type StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  stories: ['../packages/**/*.stories.tsx'],
  addons: [
    'storybook-dark-mode-v7',
    '@storybook/addon-links',
    '@storybook/addon-essentials'
    // '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  viteFinal: async (config) =>
    mergeConfig(config, {
      plugins: [tsconfigPaths()]
    })
};

export default config;
