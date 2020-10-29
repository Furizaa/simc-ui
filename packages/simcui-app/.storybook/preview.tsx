import React from 'react';
import theme from '../theme';
import { ChakraProvider, useColorMode, useColorModeValue, Flex, IconButton, extendTheme } from '@chakra-ui/core';
import { FaMoon, FaSun } from 'react-icons/fa';
import { withPerformance } from 'storybook-addon-performance';

// To display fake OS buttons
window['IS_STORYBOOK'] = true;

const extendedTheme = extendTheme(theme);

console.log(extendedTheme);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

const ColorModeToggleBar = () => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const nextMode = useColorModeValue('dark', 'light');

  return (
    <Flex justify="flex-end" mb={4}>
      <IconButton
        size="md"
        fontSize="lg"
        aria-label={`Switch to ${nextMode} mode`}
        variant="ghost"
        color="current"
        marginLeft="2"
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
      />
    </Flex>
  );
};

const withChakra = (StoryFn: Function) => (
  <ChakraProvider resetCSS theme={extendedTheme}>
    <ColorModeToggleBar />
    <StoryFn />
  </ChakraProvider>
);

export const decorators = [withChakra, withPerformance];
