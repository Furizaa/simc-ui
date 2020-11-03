import { Box, BoxProps, Tooltip } from '@chakra-ui/core';
import { RepeatClockIcon } from '@chakra-ui/icons';
import React from 'react';

export interface SpellIconQueueProps extends Omit<BoxProps, 'size'> {
  size?: 'md' | 'sm';
}

export default function SpellIconQueue({ size = 'md', ...props }: SpellIconQueueProps) {
  const boxSize = size === 'md' ? '48px' : '24px';
  const iconSize = size === 'md' ? '2xl' : 'sm';
  return (
    <Tooltip label="Queued loading from WoW API. Please wait...">
      <Box
        boxSizing="content-box"
        borderWidth="1px"
        width={boxSize}
        height={boxSize}
        borderColor="blue.800"
        bgColor="blue.900"
        d="flex"
        justifyContent="center"
        alignItems="center"
        {...props}
      >
        <RepeatClockIcon fontSize={iconSize} color="blue.500" />
      </Box>
    </Tooltip>
  );
}
