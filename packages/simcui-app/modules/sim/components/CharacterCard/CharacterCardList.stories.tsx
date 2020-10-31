import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import CharacterCardList, { CharacterCardListProps } from './CharacterCardList';
import CharacterCard from './CharacterCard';

export default {
  title: 'Sim/CharacterCardList',
  component: CharacterCardList,
} as Meta;

const Template: Story<CharacterCardListProps> = (args) => <CharacterCardList {...args} />;

const race = {
  en_US: 'maggot',
  es_MX: 'maggot',
  pt_BR: 'maggot',
  de_DE: 'maggot',
  en_GB: 'maggot',
  es_ES: 'maggot',
  fr_FR: 'maggot',
  it_IT: 'maggot',
  ru_RU: 'maggot',
};

const Children = [
  <CharacterCard
    isVertical
    key="Furizaa"
    character={{
      race,
      backgroundRenderUrl: '',
      name: 'Furizaa',
      id: '1',
      wowId: 1,
      classWowId: 8,
      level: 50,
      equippedItemLevel: 400,
    }}
    isActive
  />,
  <CharacterCard
    isVertical
    key="Neliel"
    character={{
      race,
      backgroundRenderUrl: '',
      name: 'Neliel',
      id: '1',
      wowId: 1,
      classWowId: 4,
      level: 50,
      equippedItemLevel: 400,
    }}
  />,
  <CharacterCard
    isVertical
    key="Nnoitra"
    character={{
      race,
      backgroundRenderUrl: '',
      name: 'Nnoitra',
      id: '1',
      wowId: 1,
      classWowId: 5,
      level: 50,
      equippedItemLevel: 400,
    }}
    isActive
  />,
  <CharacterCard
    isVertical
    key="Fishstyx"
    character={{
      race,
      backgroundRenderUrl: '',
      name: 'Fishstyx',
      id: '1',
      wowId: 1,
      classWowId: 3,
      level: 50,
      equippedItemLevel: 400,
    }}
  />,
  <CharacterCard
    isVertical
    key="Knopperz"
    character={{
      race,
      backgroundRenderUrl: '',
      name: 'Knopperz',
      id: '1',
      wowId: 1,
      classWowId: 1,
      level: 50,
      equippedItemLevel: 400,
    }}
  />,
  <CharacterCard
    isVertical
    key="Nutterz"
    character={{
      race,
      backgroundRenderUrl: '',
      name: 'Nutterz',
      id: '1',
      wowId: 1,
      classWowId: 7,
      level: 50,
      equippedItemLevel: 400,
    }}
  />,
  <CharacterCard
    isVertical
    key="Paladoxon"
    character={{
      race,
      backgroundRenderUrl: '',
      name: 'Paladoxon',
      id: '1',
      wowId: 1,
      classWowId: 2,
      level: 50,
      equippedItemLevel: 400,
    }}
  />,
];

export const Initial = Template.bind({});
Initial.args = {
  children: Children,
};
