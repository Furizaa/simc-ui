import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import EquipmentGrid, { EquipmentGridProps } from './EquipmentGrid';
import EquippedItemInstance from '../EquippedItemInstance/EquippedItemInstance';
import EquippedItemInstanceLoading from '../EquippedItemInstanceLoading';

export default {
  title: 'Sim/EquipmentGrid',
  component: EquipmentGrid,
} as Meta;

const Template: Story<EquipmentGridProps> = (args) => <EquipmentGrid {...args} />;

const Item = (props: any) => (
  <EquippedItemInstance
    name="Vestments of Unspeakable Rareness"
    iconSrc="https://render-eu.worldofwarcraft.com/icons/56/inv_chest_leather_legiondungeon_c_03.jpg"
    quality="RARE"
    ilvl={1000}
    enchantmentDisplays={['+500 Mastery']}
    gemDisplays={['+500 Agility']}
    {...props}
  />
);

export const Initial = Template.bind({});
Initial.args = {
  equipment: {
    HEAD: <Item />,
    HANDS: <Item />,
    NECK: <Item />,
    WAIST: <EquippedItemInstanceLoading />,
    SHOULDER: <Item />,
    LEGS: <EquippedItemInstanceLoading />,
    BACK: <Item />,
    FEET: <Item />,
    CHEST: <Item />,
    FINGER_1: <Item />,

    FINGER_2: <Item />,

    TRINKET_1: <Item />,
    WRIST: <Item />,
    TRINKET_2: <Item />,
    MAIN_HAND: <Item />,
    OFF_HAND: <Item />,
  },
};
