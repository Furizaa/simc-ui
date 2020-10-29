import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import SpellIconLoading, { SpellIconLoadingProps } from './SpellIconLoading';

export default {
  title: 'Sim/SpellIconLoading',
  component: SpellIconLoading,
} as Meta;

const Template: Story<SpellIconLoadingProps> = (args) => <SpellIconLoading {...args} />;

export const Initial = Template.bind({});
Initial.args = {};
