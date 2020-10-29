import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '@chakra-ui/core';
import FormLayoutNewSimulation, { FormLayoutNewSimulationProps } from './FormLayoutNewSimulation';

export default {
  title: 'Sim/Form Layouts/NewSimulation',
  component: FormLayoutNewSimulation,
} as Meta;

const Template: Story<FormLayoutNewSimulationProps> = (args) => <FormLayoutNewSimulation {...args} />;

const Content = () => (
  <Box w="100%" h="80px" backgroundColor="blue.900">
    Content
  </Box>
);

export const Initial = Template.bind({});
Initial.args = {
  executableComponent: <Content />,
  configurationComponent: <Content />,
};
