import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import RunnerStatus, { RunnerStatusProps } from './RunnerStatus';

export default {
  title: 'Sim/RunnerStatus',
  component: RunnerStatus,
} as Meta;

const Template: Story<RunnerStatusProps> = args => <RunnerStatus {...args} />;

export const Initial = Template.bind({});
Initial.args = {};

export const Running = Template.bind({});
Running.args = {
  currentRun: { status: 'running', percentage: 67 },
};

export const Done = Template.bind({});
Done.args = {
  currentRun: { status: 'done', dps: 67635 },
};

export const Dirty = Template.bind({});
Dirty.args = {
  currentRun: { status: 'dirty', dps: 67635 },
};

export const Queue = Template.bind({});
Queue.args = {
  currentRun: { status: 'queue' },
};
