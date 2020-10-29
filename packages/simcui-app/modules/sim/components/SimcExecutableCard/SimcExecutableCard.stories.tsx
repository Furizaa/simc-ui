import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import SimcExecutableCard, { SimcExecutableCardProps } from './SimcExecutableCard';

export default {
  title: 'Sim/SimcExecutableCard',
  component: SimcExecutableCard,
  argTypes: {
    downloadPercentage: { control: 'number' },
  },
} as Meta;

const Template: Story<SimcExecutableCardProps> = (args) => <SimcExecutableCard {...args} />;

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

export const Initial = Template.bind({});
Initial.args = {
  executable: exec,
  config: { stage: 'not-installed' },
};
export const Downloading = Template.bind({});
Downloading.args = {
  executable: exec,
  config: { stage: 'downloading', percentage: 49 },
};
export const Unpacking = Template.bind({});
Unpacking.args = {
  executable: exec,
  config: { stage: 'unpacking' },
};
export const Ready = Template.bind({});
Ready.args = {
  executable: exec,
  config: { stage: 'ready' },
};
