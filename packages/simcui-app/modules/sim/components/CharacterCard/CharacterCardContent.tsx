import { Heading, HStack, Text, VStack } from '@chakra-ui/core';
import React from 'react';
import dbCharacterClass from '@dbc/dbCharacterClass.json';
import { Character } from '../../../../types';
import characterClassToColor from '../../util/characterClassToColor';

export interface CharacterCardContentProps {
  character: Character;
  vertical?: boolean;
}

export default function CharacterCardContent({ character, vertical }: CharacterCardContentProps) {
  const classInfo = dbCharacterClass[character.classWowId];

  if (!classInfo) {
    return null;
  }

  const Stack = vertical ? VStack : HStack;

  const classColor = `${characterClassToColor(character.classWowId)}.100`;

  return (
    <Stack>
      <Heading size="sm" fontWeight="bold" letterSpacing={0.8} color={classColor}>
        {character.name}
      </Heading>
      <Text fontWeight="semibold" color="gray.400" fontSize="xs">
        {`Lv${character.level} ${classInfo.name.en_US}`}
      </Text>
    </Stack>
  );
}
