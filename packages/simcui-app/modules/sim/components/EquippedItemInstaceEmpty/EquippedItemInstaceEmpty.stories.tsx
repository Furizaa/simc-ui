import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import EquippedItemInstaceEmpty, { EquippedItemInstaceEmptyProps } from './EquippedItemInstaceEmpty';

export default {
  title: 'Sim/EquippedItemInstaceEmpty',
  component: EquippedItemInstaceEmpty,
} as Meta;

const Template: Story<EquippedItemInstaceEmptyProps> = (args) => <EquippedItemInstaceEmpty {...args} />;

export const Initial = Template.bind({});
Initial.args = {};
