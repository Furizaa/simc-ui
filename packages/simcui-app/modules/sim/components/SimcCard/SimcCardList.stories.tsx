import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import SimcCardList, { SimcCardListProps } from './SimcCardList';
import SimcCard from './SimcCard';

export default {
  title: 'Sim/SimcCardList',
  component: SimcCardList,
  argTypes: {},
} as Meta;

const Template: Story<SimcCardListProps> = (args) => <SimcCardList {...args} />;

export const List = Template.bind({});
List.args = {
  children: [
    <SimcCard key="1" simcConfigDisplay="Sane Patchwerk Defaults" />,
    <SimcCard key="2" simcConfigDisplay="Sane Patchwerk Defaults" />,
    <SimcCard key="3" simcConfigDisplay="Sane Patchwerk Defaults" />,
  ],
};
