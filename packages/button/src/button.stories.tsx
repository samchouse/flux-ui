import type { Meta, StoryObj } from '@storybook/react';

import { Button, ButtonProps } from './button';

type Story = StoryObj<ButtonProps>;

export const Default: Story = {
  args: {
    color: 'black',
    children: 'Button'
  }
};

const meta: Meta<ButtonProps> = {
  title: 'Button',
  component: Button
};

export default meta;
