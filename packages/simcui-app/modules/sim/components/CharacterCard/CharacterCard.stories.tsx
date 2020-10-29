import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import CharacterCard, { CharacterCardProps } from './CharacterCard';

export default {
  title: 'Sim/CharacterCard',
  component: CharacterCard,
} as Meta;

const Template: Story<CharacterCardProps> = (args) => <CharacterCard {...args} />;

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

export const Initial = Template.bind({});
Initial.args = {
  character: {
    race,
    classWowId: 4,
    name: 'Furizaa',
    id: '0',
    wowId: 10001,
    level: 50,
    equippedItemLevel: 45,
    backgroundRenderUrl: '',
  },
};
