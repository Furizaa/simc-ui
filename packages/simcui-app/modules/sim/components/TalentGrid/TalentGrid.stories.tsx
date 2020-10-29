import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import TalentGrid, { TalentGridProps } from './TalentGrid';
import Talent from '../Talent/Talent';

export default {
  title: 'Sim/TalentGrid',
  component: TalentGrid,
} as Meta;

const Template: Story<TalentGridProps> = (args) => <TalentGrid {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  specId: 259,
  characterClassId: 4,
  // eslint-disable-next-line react/display-name
  renderCell: () => (
    <Talent
      name="Dispense Kittens"
      iconSrc="https://render-eu.worldofwarcraft.com/icons/56/spell_shadow_summonvoidwalker.jpg"
    />
  ),
};
