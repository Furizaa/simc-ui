import { Box, CircularProgress } from '@chakra-ui/core';
import React from 'react';

export interface EquippedItemInstanceLoadingProps {
  displayDirection?: 'left' | 'right';
}

export default function EquippedItemInstanceLoading({ displayDirection = 'left' }: EquippedItemInstanceLoadingProps) {
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
        d="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size="32px" isIndeterminate color="gray.500" trackColor="transparent" capIsRound />
      </Box>
    </Box>
  );
}
