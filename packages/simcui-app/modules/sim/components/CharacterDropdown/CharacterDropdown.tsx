import React from 'react';
import { Button, HStack } from '@chakra-ui/core';
import Breadcrumb from '@shared/components/Breadcrumb';
import { Character } from '../../../../types';
import CharacterCardList from '../CharacterCard/CharacterCardList';
import CharacterCard from '../CharacterCard';
import CharacterCardContent from '../CharacterCard/CharacterCardContent';
import characterClassToColor from '../../util/characterClassToColor';

export interface CharacterDropdownProps {
  onSelect?: (value: string | undefined) => void;
  value?: string;
  characterList: Character[];
  onCreateNewClick?: () => void;
}

export default function CharacterDropdown({
  onSelect,
  value,
  characterList,
  onCreateNewClick,
}: CharacterDropdownProps) {
  const character = characterList.find((char) => char.id === value);
  const classColor = character ? `${characterClassToColor(character.classWowId)}.900` : 'gray.800';

  const handleCreateNewClick = () => {
    if (onCreateNewClick) {
      onCreateNewClick();
    }
  };

  return (
    <Breadcrumb
      label="Select Character"
      onSelect={onSelect}
      value={value}
      placement="right-start"
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
                isVertical
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
    />
  );
}
