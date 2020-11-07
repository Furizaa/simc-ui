import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import VisPie, { VisPieProps } from './VisPie';
import reportSample from '../../../data/reportSample.json';

export default {
  title: 'vis/VisPie',
  component: VisPie,
} as Meta;

const Template: Story<VisPieProps> = args => <VisPie {...args} />;

const data = reportSample.sim.players[0].stats.map(stat => ({
  label: stat.spell_name,
  value: stat.total_amount?.mean ?? 0,
}));

export const Default = Template.bind({});
Default.args = {
  width: 300,
  height: 300,
  data,
};
