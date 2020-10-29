/* eslint-disable react/display-name */
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { Button, Heading, Text, VStack } from '@chakra-ui/core';
import Breadcrumb, { BreadcrumbProps } from './Breadcrumb';
import BreadcrumbBar from '../BreadcrumbBar';

export default {
  title: 'Shared/Breadcrumb',
  component: Breadcrumb,
} as Meta;

const Content = () => (
  <>
    <Heading size="sm" display="inline">
      Breadcrumb Component
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

const Template: Story<BreadcrumbProps> = (args) => (
  <BreadcrumbBar>
    <Breadcrumb {...args} />
  </BreadcrumbBar>
);

export const Selected = Template.bind({});
Selected.args = {
  label: 'Select',
  initialValue: '1',
  initialIsOpen: true,
  renderSelectedItem: () => <Content />,
  renderItems: () => <Items />,
};

export const Empty = Template.bind({});
Empty.args = {
  label: 'Select',
  renderItems: () => <Items />,
};
