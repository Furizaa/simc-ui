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
    <SimcCard
      key="1"
      gameVersionColor="#fdfdff"
      gameVersionDisplay="Shadowlands"
      simcVersionDisplay="9.01.0"
      simcConfigDisplay="Sane Patchwerk Defaults"
    />,
    <SimcCard
      key="2"
      gameVersionColor="#fffdfd"
      gameVersionDisplay="BFA"
      simcVersionDisplay="8.30.1"
      simcConfigDisplay="Sane Patchwerk Defaults"
    />,
    <SimcCard
      key="3"
      gameVersionColor="#fdfffd"
      gameVersionDisplay="Classic"
      simcVersionDisplay="1.12.0"
      simcConfigDisplay="Sane Patchwerk Defaults"
    />,
  ],
};
