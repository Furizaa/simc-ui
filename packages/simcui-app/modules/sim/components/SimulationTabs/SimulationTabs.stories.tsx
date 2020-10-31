import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Simulation } from 'types';
import SimulationTabs, { SimulationTabsProps } from './SimulationTabs';

export default {
  title: 'Sim/SimulationTabs',
  component: SimulationTabs,
} as Meta;

const Template: Story<SimulationTabsProps> = (args) => <SimulationTabs {...args} />;

const simulations: Simulation[] = [
  {
    id: '1',
    name: 'Patchwerk',
    configurationId: '1',
  },
  {
    id: '2',
    name: 'Dungeon Slice',
    configurationId: '1',
  },
  {
    id: '3',
    name: 'Helter Skelter',
    configurationId: '1',
  },
];

export const Initial = Template.bind({});
Initial.args = {
  simulations,
  selectedSimulationId: '2',
};
