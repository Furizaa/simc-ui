import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import SpellIcon, { SpellIconProps } from './SpellIcon';

export default {
  title: 'Sim/SpellIcon',
  component: SpellIcon,
} as Meta;

const Template: Story<SpellIconProps> = (args) => <SpellIcon {...args} />;

export const Initial = Template.bind({});
Initial.args = {};
