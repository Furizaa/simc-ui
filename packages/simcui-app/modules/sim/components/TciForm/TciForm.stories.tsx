import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import TciForm, { TciFormProps } from './TciForm';

export default {
  title: 'Sim/TciForm',
  component: TciForm,
} as Meta;

const Template: Story<TciFormProps> = (args) => <TciForm {...args} />;

export const Initial = Template.bind({});
Initial.args = {};
