import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { Heading, Text } from '@chakra-ui/core';
import Card, { CardProps } from './Card';

export default {
  title: 'Shared/Card',
  component: Card,
} as Meta;

const Content = () => (
  <>
    <Heading size="sm" display="inline">
      Card Component
    </Heading>
    <Text>With some additional text.</Text>
  </>
);

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  children: <Content />,
};

export const Outline = Template.bind({});
Outline.args = {
  variant: 'outline',
  children: <Content />,
};
