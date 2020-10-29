import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { BoxProps } from '@chakra-ui/core';
import Background from './Background';

export default {
  title: 'Shared/Background',
  component: Background,
} as Meta;

const Template: Story<BoxProps> = (args) => <Background {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  children: <Background />,
};
