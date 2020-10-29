import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import EquippedItemInstanceLoading, { EquippedItemInstanceLoadingProps } from './EquippedItemInstanceLoading';

export default {
  title: 'Sim/EquippedItemInstanceLoading',
  component: EquippedItemInstanceLoading,
} as Meta;

const Template: Story<EquippedItemInstanceLoadingProps> = (args) => <EquippedItemInstanceLoading {...args} />;

export const Initial = Template.bind({});
Initial.args = {};
