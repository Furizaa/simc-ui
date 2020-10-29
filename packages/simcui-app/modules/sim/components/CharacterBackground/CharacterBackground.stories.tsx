import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import CharacterBackground, { CharacterBackgroundProps } from './CharacterBackground';

export default {
  title: 'Sim/CharacterBackground',
  component: CharacterBackground,
} as Meta;

const Template: Story<CharacterBackgroundProps> = (args) => <CharacterBackground {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  characterBackgroundUrl: 'https://render-eu.worldofwarcraft.com/character/kelthuzad/153/165322393-main.jpg',
};
