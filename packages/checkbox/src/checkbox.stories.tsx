import { Meta, Story } from '@storybook/react';

import { Checkbox, CheckboxProps } from './checkbox';

const config: Meta = {
  title: 'Checkbox',
  component: Checkbox
};
export default config;

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Option',
  size: 'md',
  checked: true,
  indeterminate: false,
  defaultChecked: true,
  disabled: false
};
