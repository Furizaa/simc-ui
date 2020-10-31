import { Box, HStack, Text } from '@chakra-ui/core';
import React from 'react';

export interface SimcCardContentProps {
  simcConfigDisplay: string;
}

export default function SimcCardContent({ simcConfigDisplay }: SimcCardContentProps) {
  return (
    <HStack spacing={3} align="flex-start">
      <Box>
        <Text fontSize="xs" fontWeight="semibold" color="gray.300">
          {simcConfigDisplay}
        </Text>
      </Box>
    </HStack>
  );
}
