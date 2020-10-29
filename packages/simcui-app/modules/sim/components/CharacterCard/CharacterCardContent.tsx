import { Heading, Text } from '@chakra-ui/core';
import React from 'react';
import dbCharacterClass from '@dbc/dbCharacterClass.json';
import { Character } from '../../../../types';
import characterClassToColor from '../../util/characterClassToColor';

export interface CharacterCardContentProps {
  character: Character;
}

export default function CharacterCardContent({ character }: CharacterCardContentProps) {
  const classInfo = dbCharacterClass[character.classWowId];

  if (!classInfo) {
    return null;
  }

  const classColor = `${characterClassToColor(character.classWowId)}.100`;

  return (
    <>
      <Text fontWeight="semibold" color="gray.400" fontSize="xs">
        {`Lv${character.level} ${classInfo.name.en_US}`}
      </Text>
      <Heading size="sm" fontWeight="bold" letterSpacing={0.8} color={classColor}>
        {character.name}
      </Heading>
    </>
  );
}
