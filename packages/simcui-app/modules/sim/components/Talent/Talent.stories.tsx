import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Talent, { TalentProps } from './Talent';

export default {
  title: 'Sim/Talent',
  component: Talent,
} as Meta;

const Template: Story<TalentProps> = (args) => <Talent {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  iconSrc: 'https://render-eu.worldofwarcraft.com/icons/56/spell_shadow_summonvoidwalker.jpg',
  name: 'Dispense Kittens',
};
