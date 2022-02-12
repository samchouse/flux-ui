import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Checkbox } from './checkbox';

const config: ComponentMeta<typeof Checkbox> = {
  title: 'Checkbox',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  component: Checkbox
};
export default config;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  checked: true,
  indeterminate: false,
  defaultChecked: true,
  disabled: false
};
