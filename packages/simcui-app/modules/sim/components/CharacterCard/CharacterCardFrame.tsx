import { Box } from '@chakra-ui/core';
import React from 'react';
import { Character } from '../../../../types';
import characterClassToColor from '../../util/characterClassToColor';

export interface CharacterCardFrameProps {
  character: Character;
  isActive?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function CharacterCardFrame({ children, character, isActive, onClick }: CharacterCardFrameProps) {
  const classColor = `${characterClassToColor(character.classWowId)}.100`;
  const highlightColor = `${characterClassToColor(character.classWowId)}.700`;

  const handleOnClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Box
      borderRadius="4px"
      px={3}
      py={1}
      cursor="pointer"
      boxShadow="dark-lg"
      position="relative"
      bgColor={isActive ? highlightColor : 'gray.800'}
      _hover={{ backgroundColor: highlightColor }}
      onClick={handleOnClick}
    >
      {isActive ? (
        <>
          <Box
            position="absolute"
            top="8px"
            bottom="8px"
            left="0"
            width="2px"
            bgColor={classColor}
            borderTopRightRadius="2px"
            borderBottomRightRadius="2px"
          />
          <Box
            position="absolute"
            top="8px"
            bottom="8px"
            right="0"
            width="2px"
            bgColor={classColor}
            borderTopLeftRadius="2px"
            borderBottomLeftRadius="2px"
          />
        </>
      ) : null}
      {children}
    </Box>
  );
}
