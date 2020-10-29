import { Box, BoxProps } from '@chakra-ui/core';
import React from 'react';
import backupIconSrc from '../../../../internals/img/inv_misc_questionmark.jpg';

export interface SpellIconProps extends Omit<BoxProps, 'size'> {
  iconSrc?: string;
  name: string;
  size?: 'md' | 'sm';
}

export default function SpellIcon({ iconSrc, name, size = 'md', ...props }: SpellIconProps) {
  const boxSize = size === 'md' ? '48px' : '24px';
  return (
    <Box boxSizing="content-box" borderWidth="1px" width={boxSize} height={boxSize} borderColor="gray.700" {...props}>
      <img width="100%" height="100%" src={iconSrc || backupIconSrc} alt={name} />
    </Box>
  );
}
