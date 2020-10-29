import React from 'react';
import { Box, Button, HStack } from '@chakra-ui/core';
import Breadcrumb from '@shared/components/Breadcrumb';
import { Character } from '../../../../types';
import CharacterCardList from '../CharacterCard/CharacterCardList';
import CharacterCard from '../CharacterCard';
import CharacterCardContent from '../CharacterCard/CharacterCardContent';
import characterClassToColor from '../../util/characterClassToColor';

export interface CharacterDropdownProps {
  onSelect?: (value: string | undefined) => void;
  onCreateNewClick?: () => void;
  value?: string;
  characterList: Character[];
}

export default function CharacterDropdown({
  onSelect,
  onCreateNewClick,
  value,
  characterList,
}: CharacterDropdownProps) {
  const handleCreateNewClick = () => {
    if (onCreateNewClick) {
      onCreateNewClick();
    }
  };

  const character = characterList.find((char) => char.id === value);
  const classColor = character ? `${characterClassToColor(character.classWowId)}.900` : 'gray.800';

  return (
    <Breadcrumb
      label="Select Character"
      onSelect={onSelect}
      value={value}
      placement="bottom"
      bgColor={classColor}
      renderItems={({ handleSelect }) => (
        <CharacterCardList>
          {characterList.map((char) => {
            return (
              <CharacterCard
                key={char.id}
                character={char}
                onClick={() => handleSelect(char.id)}
                isActive={char.id === value}
              />
            );
          })}
        </CharacterCardList>
      )}
      renderSelectedItem={(selectedValue) => {
        if (!character || !selectedValue) {
          return null;
        }

        return <CharacterCardContent character={character} />;
      }}
      renderFooter={() => (
        <HStack>
          <Button size="xs" disabled={!onCreateNewClick} onClick={handleCreateNewClick}>
            Create / Import new Character
          </Button>
          <Button size="xs" variant="ghost" disabled>
            Manage All
          </Button>
        </HStack>
      )}
      renderEmpty={() => (
        <Box pl={12}>
          <Button colorScheme="purple" size="sm" onClick={handleCreateNewClick}>
            Create or Import New Character
          </Button>
        </Box>
      )}
    />
  );
}
