import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import CharacterTabs, { CharacterTabsProps } from './CharacterTabs';

export default {
  title: 'Sim/CharacterTabs',
  component: CharacterTabs,
} as Meta;

const Template: Story<CharacterTabsProps> = (args) => <CharacterTabs {...args} />;

export const Initial = Template.bind({});
Initial.args = {};
