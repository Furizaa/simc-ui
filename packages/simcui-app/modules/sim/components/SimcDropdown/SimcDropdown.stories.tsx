import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/core';
import SimcDropdown, { SimcDropdownProps } from './SimcDropdown';
import simConfigs from '../../../data/simConfigs';

export default {
  title: 'Sim/SimcDropdown',
  component: SimcDropdown,
  args: {
    simulationConfigList: simConfigs,
    simulationParameterList: [
      {
        configurationId: '01EMH72R909F6Q5MCYNGKX5YRA',
        executableGUID: '01EM9GJQHKCA1ZVW534TEYMRQ9',
        id: '001',
      },
      {
        configurationId: '01EMH72R909F6Q5MCYNGKX5YRA',
        executableGUID: '01EMF28EE5PY9R6RTGBZ119C25',
        id: '002',
      },
      {
        configurationId: '01EMH72R909F6Q5MCYNGKX5YRA',
        executableGUID: '01EMF28F5BNV40D7ZRKWH94JYC',
        id: '003',
      },
    ],
  },
} as Meta;

const Template: Story<SimcDropdownProps> = (args) => (
  <Box w="xs">
    <SimcDropdown {...args} />
  </Box>
);

export const Selected = Template.bind({});
Selected.args = {
  value: '001',
};
