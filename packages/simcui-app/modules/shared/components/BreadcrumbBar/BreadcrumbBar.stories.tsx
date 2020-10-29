import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box, Heading, Text } from '@chakra-ui/core';
import BreadcrumbBar, { BreadcrumbBarProps } from './BreadcrumbBar';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

export default {
  title: 'Shared/BreadcrumbBar',
  component: BreadcrumbBar,
} as Meta;

const Template: Story<BreadcrumbBarProps> = (args) => <BreadcrumbBar {...args} />;

const Content = () => (
  <>
    <Heading size="sm" display="inline">
      Breadcrumb Component
    </Heading>
    <Text>With some additional text.</Text>
  </>
);

const HoverTest = () => (
  <Box w="100px" h="100px" _hover={{ bgColor: '#00ff00' }} _groupHover={{ bgColor: '#ff0000' }}>
    Group Hover Test. Component should never show red color.
  </Box>
);

export const Initial = Template.bind({});
Initial.args = {
  children: [
    <Breadcrumb
      label="thing"
      key="1"
      value="1"
      renderFooter={() => <div />}
      renderItems={() => <HoverTest />}
      renderSelectedItem={() => <Content />}
    />,
    <Breadcrumb
      label="thing"
      key="1"
      value="1"
      renderFooter={() => <div />}
      renderItems={() => <HoverTest />}
      renderSelectedItem={() => <Content />}
    />,
    <Breadcrumb
      label="thing"
      key="1"
      value="1"
      renderFooter={() => <div />}
      renderItems={() => <HoverTest />}
      renderSelectedItem={() => <Content />}
    />,
  ],
};
