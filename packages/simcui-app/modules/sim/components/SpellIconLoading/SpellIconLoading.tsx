import { Box, BoxProps, CircularProgress } from '@chakra-ui/core';
import React from 'react';

export interface SpellIconLoadingProps extends Omit<BoxProps, 'size'> {
  size?: 'md' | 'sm';
}

export default function SpellIconLoading({ size = 'md', ...props }: SpellIconLoadingProps) {
  const boxSize = size === 'md' ? '48px' : '24px';
  const progressSize = size === 'md' ? '26px' : '16px';
  return (
    <Box
      boxSizing="content-box"
      borderWidth="1px"
      width={boxSize}
      height={boxSize}
      borderColor="gray.600"
      bgColor="gray.800"
      d="flex"
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <CircularProgress size={progressSize} isIndeterminate color="gray.500" trackColor="transparent" capIsRound />
    </Box>
  );
}
