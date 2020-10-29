import React from 'react';
import { Box, BoxProps } from '@chakra-ui/core';

export interface CharacterBackgroundProps extends BoxProps {
  characterBackgroundUrl?: string;
}

export default function CharacterBackground(props: CharacterBackgroundProps) {
  const { children, characterBackgroundUrl, ...rest } = props;
  return (
    <Box
      w="100%"
      h="100%"
      pos="relative"
      bgImage={characterBackgroundUrl ? `url(${characterBackgroundUrl})` : undefined}
      bgSize="150%"
      bgPosition="center"
      bgRepeat="no-repeat"
      {...rest}
    >
      <Box pos="absolute" top="0" bottom="0" left="0" right="0" bgColor="translucent">
        {children}
      </Box>
    </Box>
  );
}
