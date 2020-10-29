import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {{pascalCase name}}, { {{pascalCase name}}Props } from './{{pascalCase name}}';

export default {
  title: 'Unknown/{{pascalCase name}}',
  component: {{pascalCase name}},
} as Meta;

const Template: Story<{{pascalCase name}}Props> = (args) => <{{pascalCase name}} {...args} />;

export const Initial = Template.bind({});
Initial.args = {
};
