import { HStack, Text } from '@chakra-ui/core';
import React from 'react';
import SpellIcon from '../SpellIcon';

export interface TalentProps {
  iconSrc?: string;
  name: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function Talent({ iconSrc, name, isActive, onClick }: TalentProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <HStack
      borderWidth="1px"
      borderColor={isActive ? 'gray.50' : 'gray.500'}
      bgColor={isActive ? 'frosted' : 'transparent'}
      p={1}
      style={{ backdropFilter: 'blur(10px)' }}
      cursor={onClick && 'pointer'}
      onClick={handleClick}
    >
      <SpellIcon size="md" iconSrc={iconSrc} name={name} opacity={isActive ? 1 : 0.5} />
      <Text fontWeight="semibold" color={isActive ? 'gray.50' : 'gray.500'}>
        {name}
      </Text>
    </HStack>
  );
}
