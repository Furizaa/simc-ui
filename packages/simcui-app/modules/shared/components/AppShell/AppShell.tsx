import { Box, HStack } from '@chakra-ui/core';
import React from 'react';
import Background from '../Background/Background';

interface AppShellProps {
  children?: React.ReactNode;
}

const StorybookWindowStyleWrapper = ({ children }: { children: React.ReactNode }) => {
  if ('IS_STORYBOOK' in window) {
    return (
      <Box
        w="100%"
        h="md"
        borderRadius="4px"
        borderColor="#000102"
        px="1px"
        py="1px"
        overflow="hidden"
        boxShadow="cardInset"
        pos="relative"
      >
        {children}
      </Box>
    );
  }
  return (
    <Box w="100%" h="100%">
      {children}
    </Box>
  );
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <StorybookWindowStyleWrapper>
      <Background>
        {'IS_STORYBOOK' in window && (
          <HStack position="absolute" top="5px" left="8px">
            <Box w="12px" h="12px" borderRadius="full" bgColor="red.500" />
            <Box w="12px" h="12px" borderRadius="full" bgColor="yellow.500" />
            <Box w="12px" h="12px" borderRadius="full" bgColor="green.500" />
          </HStack>
        )}
        <Box
          id="app-os-bar"
          w="100%"
          h="24px"
          bgColor="translucent"
          borderBottomWidth="1px"
          borderColor="gray.700"
          css={{
            WebkitAppRegion: 'drag',
          }}
        />
        <Box id="app-content" pos="absolute" top="24px" left="0" right="0" bottom="0">
          {children}
        </Box>
      </Background>
    </StorybookWindowStyleWrapper>
  );
}
