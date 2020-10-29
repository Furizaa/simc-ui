import { Box, Heading, HStack, Text } from '@chakra-ui/core';
import React from 'react';

export interface SimcCardContentProps {
  simcVersionDisplay: string;
  simcConfigDisplay: string;
  gameVersionDisplay: string;
  gameVersionColor: string;
}

export default function SimcCardContent({
  simcVersionDisplay,
  gameVersionDisplay,
  gameVersionColor,
  simcConfigDisplay,
}: SimcCardContentProps) {
  return (
    <HStack spacing={3} align="flex-start">
      <Box>
        <Box>
          <Heading as="span" size="sm">
            {simcVersionDisplay}
          </Heading>
          <Heading ml={2} as="span" size="sm" color={gameVersionColor}>
            {gameVersionDisplay}
          </Heading>
        </Box>
        <Text fontSize="xs" fontWeight="semibold" color="gray.300">
          {simcConfigDisplay}
        </Text>
      </Box>
    </HStack>
  );
}
