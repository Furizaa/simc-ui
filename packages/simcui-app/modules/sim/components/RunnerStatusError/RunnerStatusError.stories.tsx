import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import RunnerStatusError, { RunnerStatusErrorProps } from './RunnerStatusError';

export default {
  title: 'Sim/RunnerStatusError',
  component: RunnerStatusError,
} as Meta;

const Template: Story<RunnerStatusErrorProps> = (args) => <RunnerStatusError {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  errorText: 'An error has occured while running the simuleeeshuuun!',
};
