import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import VisLineGraph, { VisLineGraphProps } from './VisLineGraph';
import reportSample from '../../../data/reportSample.json';

export default {
  title: 'vis/VisLineGraph',
  component: VisLineGraph,
} as Meta;

const Template: Story<VisLineGraphProps> = args => <VisLineGraph {...args} />;

export const DPS = Template.bind({});
DPS.args = {
  width: 700,
  height: 180,
  data: reportSample.sim.players[0].collected_data.timeline_dmg.data,
};

export const ResourceCont = Template.bind({});
ResourceCont.args = {
  width: 700,
  height: 180,
  data: reportSample.sim.players[0].collected_data.resource_timelines.mana.data,
  colorScheme: 'blue',
};

export const Resource = Template.bind({});
Resource.args = {
  width: 700,
  height: 180,
  data: reportSample.sim.players[0].collected_data.resource_timelines.soul_shard.data,
  colorScheme: 'classWarlock',
};
