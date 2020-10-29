import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import SnapshotCard, { SnapshotCardProps } from './SnapshotCard';

export default {
  title: 'Sim/SnapshotCard',
  component: SnapshotCard,
} as Meta;

const Template: Story<SnapshotCardProps> = (args) => <SnapshotCard {...args} />;

export const NewSnapshot = Template.bind({});
NewSnapshot.args = {
  snapshot: {
    at: 1603459847742,
    simProcessId: '1',
    id: '1',
    name: 'Armory Import',
    isFrozen: false,
    equipmentSetId: '1',
    talentSetId: '1',
  },
  process: {
    createdAt: Date.now(),
    status: { type: 'idle' },
  },
};

export const RunningSnapshot = Template.bind({});
RunningSnapshot.args = {
  snapshot: {
    at: 1603459847742,
    simProcessId: '1',
    id: '1',
    name: 'Armory Import',
    isFrozen: false,
    equipmentSetId: '1',
    talentSetId: '1',
  },
  process: {
    createdAt: Date.now(),
    status: { type: 'running', percentage: 86 },
  },
};

export const DoneSnapshot = Template.bind({});
DoneSnapshot.args = {
  snapshot: {
    at: 1603459847742,
    simProcessId: '1',
    id: '1',
    name: 'Armory Import',
    isFrozen: false,
    equipmentSetId: '1',
    talentSetId: '1',
  },
  process: {
    createdAt: Date.now(),
    status: { type: 'done', result: {} },
  },
};
