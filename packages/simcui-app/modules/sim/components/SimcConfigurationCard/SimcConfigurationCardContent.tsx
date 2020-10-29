import { Box, Heading, HStack, Text } from '@chakra-ui/core';
import { SettingsIcon } from '@chakra-ui/icons';
import React from 'react';

export interface SimcExecutableCardContentProps {
  name: string;
  description: string;
}

export default function SimcExecutableCardContent({ name, description }: SimcExecutableCardContentProps) {
  return (
    <HStack spacing={3} align="flex-start">
      <Box p={2}>
        <SettingsIcon boxSize={6} />
      </Box>
      <Box>
        <Box>
          <Heading size="sm">{name}</Heading>
        </Box>
        <Text fontSize="xs">{description}</Text>
      </Box>
    </HStack>
  );
}
