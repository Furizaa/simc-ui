import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import SnapshotTimelineEntry, { SnapshotTimelineEntryProps } from './SnapshotTimelineEntry';

export default {
  title: 'Sim/SnapshotTimelineEntry',
  component: SnapshotTimelineEntry,
} as Meta;

const Template: Story<SnapshotTimelineEntryProps> = (args) => <SnapshotTimelineEntry {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  snapshot: {
    at: Date.now(),
    id: '1',
    equipmentSetId: '1',
    isFrozen: true,
    name: 'New Snapshot',
    simProcessId: '1',
    talentSetId: '1',
  },
  process: {
    createdAt: Date.now(),
    status: { type: 'done', result: {} },
  },
  isActive: true,
  isRoot: true,
};

export const Temporary = Template.bind({});
Temporary.args = {
  snapshot: {
    at: Date.now(),
    id: '1',
    equipmentSetId: '1',
    isFrozen: false,
    name: 'New Snapshot',
    simProcessId: '1',
    talentSetId: '1',
  },
  process: {
    createdAt: Date.now(),
    status: { type: 'done', result: {} },
  },
  isActive: true,
  isRoot: true,
};

export const IncreasedDps = Template.bind({});
IncreasedDps.args = {
  snapshot: {
    at: Date.now(),
    id: '1',
    equipmentSetId: '1',
    isFrozen: true,
    name: 'New Snapshot',
    simProcessId: '1',
    talentSetId: '1',
  },
  process: {
    createdAt: Date.now(),
    status: { type: 'done', result: { sim: { players: [{ collected_data: { dps: { mean: 870.03612 } } }] } } },
  },
  processPrevious: {
    createdAt: Date.now(),
    status: { type: 'done', result: { sim: { players: [{ collected_data: { dps: { mean: 821.836 } } }] } } },
  },
  isActive: true,
  isRoot: true,
};

export const DecreaseDps = Template.bind({});
DecreaseDps.args = {
  snapshot: {
    at: Date.now(),
    id: '1',
    equipmentSetId: '1',
    isFrozen: true,
    name: 'New Snapshot',
    simProcessId: '1',
    talentSetId: '1',
  },
  process: {
    createdAt: Date.now(),
    status: { type: 'done', result: { sim: { players: [{ collected_data: { dps: { mean: 1870.03612 } } }] } } },
  },
  processPrevious: {
    createdAt: Date.now(),
    status: { type: 'done', result: { sim: { players: [{ collected_data: { dps: { mean: 2821.836 } } }] } } },
  },
  isActive: true,
  isRoot: true,
};
