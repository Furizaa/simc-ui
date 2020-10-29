import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import SimcConfigurationCardList, { SimcConfigurationCardListProps } from './SimcConfigurationCardList';
import SimcConfigurationCard from './SimcConfigurationCard';

export default {
  title: 'Sim/SimcConfigurationCardList',
  component: SimcConfigurationCardList,
  argTypes: {},
} as Meta;

const Template: Story<SimcConfigurationCardListProps> = (args) => <SimcConfigurationCardList {...args} />;

export const List = Template.bind({});
List.args = {
  children: [
    <SimcConfigurationCard key="1" name="Patchwerk" description="Description Description Description" />,
    <SimcConfigurationCard key="2" name="Patchwerk" description="Description Description Description" />,
    <SimcConfigurationCard key="3" name="Patchwerk" description="Description Description Description" />,
    <SimcConfigurationCard key="4" name="Patchwerk" description="Description Description Description" />,
  ],
};
