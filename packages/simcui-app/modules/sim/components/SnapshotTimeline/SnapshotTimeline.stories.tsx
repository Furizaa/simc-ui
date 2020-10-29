import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { SimProcess, Snapshot } from 'types';
import SnapshotTimeline, { SnapshotTimelineProps } from './SnapshotTimeline';

export default {
  title: 'Sim/SnapshotTimeline',
  component: SnapshotTimeline,
} as Meta;

const Template: Story<SnapshotTimelineProps> = (args) => <SnapshotTimeline {...args} />;

const data: Array<{ snapshot: Snapshot; process: SimProcess }> = [
  {
    snapshot: {
      at: 1603979223045,
      id: '4',
      name: 'Other Changes',
      isFrozen: false,
      equipmentSetId: '2',
      simProcessId: '1',
      talentSetId: '1',
    },
    process: {
      createdAt: 1603979223045,
      status: { type: 'idle' },
    },
  },
  {
    snapshot: {
      at: 1603979221514,
      id: '3',
      name: 'Changed Equip',
      isFrozen: true,
      equipmentSetId: '2',
      simProcessId: '1',
      talentSetId: '1',
    },
    process: {
      createdAt: 1603979221514,
      status: { type: 'running', percentage: 75 },
    },
  },
  {
    snapshot: {
      at: 1603979219771,
      id: '2',
      name: 'Changed Skills',
      isFrozen: true,
      equipmentSetId: '2',
      simProcessId: '1',
      talentSetId: '1',
    },
    process: {
      createdAt: 1603979219771,
      status: { type: 'done', result: { sim: { players: [{ collected_data: { dps: { mean: 1000 } } }] } } },
    },
  },
  {
    snapshot: {
      at: 1603979218166,
      id: '1',
      name: 'Armory Import',
      isFrozen: true,
      equipmentSetId: '2',
      simProcessId: '1',
      talentSetId: '1',
    },
    process: {
      createdAt: 1603979218166,
      status: { type: 'done', result: { sim: { players: [{ collected_data: { dps: { mean: 870 } } }] } } },
    },
  },
];

export const Initial = Template.bind({});
Initial.args = {
  data,
  activeSnapshotId: '1',
};
