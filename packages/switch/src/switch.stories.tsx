import { Meta, Story } from '@storybook/react';

import { Switch, SwitchProps } from './switch';

const config: Meta = {
  title: 'Switch',
  component: Switch
};
export default config;

const Template: Story<SwitchProps> = (args) => <Switch {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 'md',
  color: 'blue',
  radius: 'lg',
  checked: true,
  disabled: false,
  defaultChecked: true,
  label: 'Option'
};
