import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import SimcExecutableCardList, { SimcExecutableCardListProps } from './SimcExecutableCardList';
import SimcExecutableCard from './SimcExecutableCard';

export default {
  title: 'Sim/SimcExecutableCardList',
  component: SimcExecutableCardList,
  argTypes: {},
} as Meta;

const Template: Story<SimcExecutableCardListProps> = (args) => <SimcExecutableCardList {...args} />;

const exec = {
  url: 'http://downloads.simulationcraft.org/simc-830-01-osx-x86.dmg',
  simver: '830-01',
  semver: '8.30.1',
  wowver: '8.3.0-build.33051',
  target: 'darwin',
  guid: '01EM9GJQHKCA1ZVW534TEYMRQ9',
  wowverDisplay: 'Shadowlands',
  wowverColor: '#fdfdfa',
};

export const List = Template.bind({});
List.args = {
  children: [
    <SimcExecutableCard key="1" executable={exec} config={{ stage: 'not-installed' }} />,
    <SimcExecutableCard key="2" executable={exec} config={{ stage: 'not-installed' }} />,
    <SimcExecutableCard key="3" executable={exec} config={{ stage: 'not-installed' }} />,
    <SimcExecutableCard key="4" executable={exec} config={{ stage: 'not-installed' }} />,
  ],
};
