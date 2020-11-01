import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import BreadcrumbBar from '@shared/components/BreadcrumbBar';
import { WOW } from 'types';
import CharacterDropdown, { CharacterDropdownProps } from './CharacterDropdown';

export default {
  title: 'Sim/CharacterDropdown',
  component: CharacterDropdown,
} as Meta;

const Template: Story<CharacterDropdownProps> = args => (
  <BreadcrumbBar>
    <CharacterDropdown {...args} />
  </BreadcrumbBar>
);

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

const characterList = [
  {
    classWowId: 4 as WOW.CharacterClassId,
    name: 'Furizaa',
    id: '0',
    wowId: 10001,
    level: 50,
    equippedItemLevel: 45,
    backgroundRenderUrl: '',
    race,
    snapshotIds: [],
  },
  {
    backgroundRenderUrl: '',
    name: 'Neliel',
    id: '1',
    wowId: 1,
    classWowId: 4 as WOW.CharacterClassId,
    level: 50,
    equippedItemLevel: 400,
    race,
    snapshotIds: [],
  },
  {
    backgroundRenderUrl: '',
    name: 'Fishstyx',
    id: '1',
    wowId: 1,
    classWowId: 3 as WOW.CharacterClassId,
    level: 50,
    equippedItemLevel: 400,
    race,
    snapshotIds: [],
  },
];

export const Initial = Template.bind({});
Initial.args = {
  characterList,
  value: '0',
};
