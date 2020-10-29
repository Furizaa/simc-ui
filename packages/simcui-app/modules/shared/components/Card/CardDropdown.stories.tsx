/* eslint-disable react/display-name */
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { Button, Heading, Text, VStack } from '@chakra-ui/core';
import CardDropdown, { CardDropdownProps } from './CardDropdown';

export default {
  title: 'Shared/CardDropdown',
  component: CardDropdown,
} as Meta;

const Content = () => (
  <>
    <Heading size="sm" display="inline">
      Card Component
    </Heading>
    <Text>With some additional text.</Text>
  </>
);

const Items = () => (
  <VStack>
    <Button width="lg">Item 1</Button>
    <Button>Item 2</Button>
    <Button>Item 3</Button>
  </VStack>
);

const Template: Story<CardDropdownProps> = (args) => <CardDropdown {...args} />;

export const Selected = Template.bind({});
Selected.args = {
  label: 'Select',
  initialValue: 1,
  initialIsOpen: true,
  renderSelectedItem: () => <Content />,
  renderItems: () => <Items />,
};

export const Empty = Template.bind({});
Empty.args = {
  label: 'Select',
  renderItems: () => <Items />,
};
