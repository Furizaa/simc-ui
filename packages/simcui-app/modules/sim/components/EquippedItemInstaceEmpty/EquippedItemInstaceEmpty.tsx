import { Box } from '@chakra-ui/core';
import React from 'react';

export interface EquippedItemInstaceEmptyProps {
  displayDirection?: 'left' | 'right';
}

export default function EquippedItemInstaceEmpty({ displayDirection = 'left' }: EquippedItemInstaceEmptyProps) {
  const flexDirection = displayDirection === 'right' ? 'row-reverse' : 'row';
  return (
    <Box d="flex" alignItems="flex-start" flexDirection={flexDirection} w="100%">
      <Box
        boxSizing="content-box"
        borderWidth="1px"
        width="56px"
        height="56px"
        borderColor="gray.600"
        bgColor="gray.800"
      />
    </Box>
  );
}
