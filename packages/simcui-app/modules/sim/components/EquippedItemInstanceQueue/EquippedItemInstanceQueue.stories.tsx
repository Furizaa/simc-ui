import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import EquippedItemInstanceQueue, { EquippedItemInstanceQueueProps } from './EquippedItemInstanceQueue';

export default {
  title: 'Sim/EquippedItemInstanceQueue',
  component: EquippedItemInstanceQueue,
} as Meta;

const Template: Story<EquippedItemInstanceQueueProps> = args => <EquippedItemInstanceQueue {...args} />;

export const Initial = Template.bind({});
Initial.args = {};
