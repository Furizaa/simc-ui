import { Badge, Box, CircularProgress, HStack } from '@chakra-ui/core';
import useExecutableStatus from '@sim/hooks/useExecutableStatus';
import React from 'react';

export default function StatusBar() {
  const executableStatus = useExecutableStatus();

  return (
    <Box
      h="24px"
      bgColor="gray.700"
      borderTopColor="gray.900"
      borderTopWidth="1px"
      d="flex"
      alignItems="center"
      justifyContent="flex-end"
      overflow="hidden"
    >
      {!executableStatus.data && !executableStatus.error && (
        <CircularProgress trackColor="gray.700" size="16px" isIndeterminate color="yellow.300" px={2} />
      )}
      {executableStatus.data && (
        <HStack px={2}>
          <Badge colorScheme="yellow">SIMC {executableStatus.data.simc}</Badge>
          <Badge colorScheme="yellow">WOW {executableStatus.data.wow}</Badge>
        </HStack>
      )}
      {!executableStatus.data && executableStatus.error && (
        <Box px={2}>
          <Badge colorScheme="red">SIMC Status Error</Badge>
        </Box>
      )}
    </Box>
  );
}
