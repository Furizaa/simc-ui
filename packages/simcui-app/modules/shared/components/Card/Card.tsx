import React from 'react';
import { Box, BoxProps, useStyleConfig } from '@chakra-ui/core';

export interface CardProps extends BoxProps {
  onClick?: () => void;
  variant?: 'solid' | 'outline' | 'clean';
}

export default function Card({ onClick, variant, ...rest }: CardProps) {
  const styles = useStyleConfig('Card', { variant });
  const hoverStyles = onClick
    ? { background: 'gray.700', cursor: 'pointer', transition: 'background 250ms' }
    : undefined;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return <Box onClick={handleClick} sx={styles} _hover={hoverStyles} {...rest} />;
}
