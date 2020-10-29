import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/core';
import { SimProcess, Snapshot } from 'types';
import SnapshotDropdown, { SnapshotDropdownProps } from './SnapshotDropdown';

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

export default {
  title: 'Sim/SnapshotDropdown',
  component: SnapshotDropdown,
  args: {
    data,
  },
} as Meta;

const Template: Story<SnapshotDropdownProps> = (args) => (
  <Box w="xs">
    <SnapshotDropdown {...args} />
  </Box>
);

export const Selected = Template.bind({});
Selected.args = {
  value: '3',
};
