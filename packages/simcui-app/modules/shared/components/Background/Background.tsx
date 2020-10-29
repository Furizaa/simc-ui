import React from 'react';
import { Box, BoxProps } from '@chakra-ui/core';
import epic from '../../../../internals/img/bg-epic.svg';

export default function Background(props: BoxProps) {
  return (
    <Box
      w="100%"
      h="100%"
      bgImage={`url(${epic})`}
      bgSize="cover"
      bgRepeat="no-repeat"
      bgAttachment="fixed"
      bgPos="calc(100vw / -1.7) calc(100vh / -2.5)"
      bgColor="epicBg"
      {...props}
    />
  );
}
