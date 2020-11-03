import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import SpellIconQueue, { SpellIconQueueProps } from './SpellIconQueue';

export default {
  title: 'Sim/SpellIconQueue',
  component: SpellIconQueue,
} as Meta;

const Template: Story<SpellIconQueueProps> = args => <SpellIconQueue {...args} />;

export const Initial = Template.bind({});
Initial.args = {};
