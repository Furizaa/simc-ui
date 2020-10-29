import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import VisDpsOverFight, { VisDpsOverFightProps } from './VisDpsOverFight';
import reportSample from '../../../data/reportSample.json';

export default {
  title: 'vis/VisDpsOverFight',
  component: VisDpsOverFight,
} as Meta;

const Template: Story<VisDpsOverFightProps> = (args) => <VisDpsOverFight {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  width: 700,
  height: 180,
  data: reportSample.sim.players[0].collected_data.timeline_dmg.data,
};
