import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import SimcConfigurationCard, { SimcConfigurationCardProps } from './SimcConfigurationCard';

export default {
  title: 'Sim/SimcConfigurationCard',
  component: SimcConfigurationCard,
} as Meta;

const Template: Story<SimcConfigurationCardProps> = (args) => <SimcConfigurationCard {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  name: 'Patcherk',
  description: "Preselected sane defaults for a Tank'n'Spank style fight in an raid environment.",
};
