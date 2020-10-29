import { Box, Button, HStack, Text, Tooltip } from '@chakra-ui/core';
import { WarningTwoIcon } from '@chakra-ui/icons';

import React from 'react';

export interface RunnerStatusErrorProps {
  errorText: string;
  onClickReset?: () => void;
}

export default function RunnerStatusError({ errorText, onClickReset }: RunnerStatusErrorProps) {
  const handleClickReset = () => {
    if (onClickReset) {
      onClickReset();
    }
  };

  return (
    <Tooltip bgColor="red.900" color="red.300" hasArrow label={errorText}>
      <Box borderWidth="1px" borderColor="red.300" p={2} bgColor="red.900">
        <HStack>
          <WarningTwoIcon color="red.300" />
          <Text fontSize="xs" color="red.300" maxW="2xs" noOfLines={2}>
            {errorText}
          </Text>
          <Button size="sm" variant="outline" colorScheme="red" onClick={handleClickReset}>
            Reset
          </Button>
        </HStack>
      </Box>
    </Tooltip>
  );
}
