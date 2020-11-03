import { Box, Tooltip } from '@chakra-ui/core';
import { RepeatClockIcon } from '@chakra-ui/icons';
import React from 'react';

export interface EquippedItemInstanceQueueProps {
  displayDirection?: 'left' | 'right';
}

export default function EquippedItemInstanceQueue({ displayDirection = 'left' }: EquippedItemInstanceQueueProps) {
  const flexDirection = displayDirection === 'right' ? 'row-reverse' : 'row';
  return (
    <Box d="flex" alignItems="flex-start" flexDirection={flexDirection} w="100%">
      <Tooltip label="Queued loading from WoW API. Please wait...">
        <Box
          boxSizing="content-box"
          borderWidth="1px"
          width="56px"
          height="56px"
          borderColor="blue.800"
          bgColor="blue.900"
          d="flex"
          justifyContent="center"
          alignItems="center"
        >
          <RepeatClockIcon fontSize="2xl" color="blue.500" />
        </Box>
      </Tooltip>
    </Box>
  );
}
