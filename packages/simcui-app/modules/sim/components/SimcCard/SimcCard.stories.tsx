import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import SimcCard, { SimcCardProps } from './SimcCard';

export default {
  title: 'Sim/SimcCard',
  component: SimcCard,
} as Meta;

const Template: Story<SimcCardProps> = (args) => <SimcCard {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  gameVersionColor: '#fdfdfa',
  gameVersionDisplay: 'Shadowlands',
  simcVersionDisplay: '9.01.0',
  simcConfigDisplay: 'Sane Defaults Patchwerk',
};
