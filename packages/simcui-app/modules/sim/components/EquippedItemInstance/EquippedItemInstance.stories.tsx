import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import EquippedItemInstance, { EquippedItemInstanceProps } from './EquippedItemInstance';

export default {
  title: 'Sim/EquippedItemInstance',
  component: EquippedItemInstance,
} as Meta;

const Template: Story<EquippedItemInstanceProps> = (args) => <EquippedItemInstance {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  name: 'Vestments of Unspeakable Rareness',
  iconSrc: 'https://render-eu.worldofwarcraft.com/icons/56/inv_chest_leather_legiondungeon_c_03.jpg',
  quality: 'RARE',
  ilvl: 1000,
  enchantmentDisplays: ['+500 Mastery'],
  gemDisplays: ['+500 Agility'],
};
