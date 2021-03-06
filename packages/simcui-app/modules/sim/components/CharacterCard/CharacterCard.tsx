import React from 'react';
import { Character } from '../../../../types';
import CharacterCardFrame from './CharacterCardFrame';
import CharacterCardContent from './CharacterCardContent';

export interface CharacterCardProps {
  character: Character;
  isActive?: boolean;
  isVertical?: boolean;
  onClick?: () => void;
}

export default function CharacterCard({ character, isActive, isVertical, onClick }: CharacterCardProps) {
  return (
    <CharacterCardFrame character={character} isActive={isActive} onClick={onClick}>
      <CharacterCardContent character={character} vertical={isVertical} />
    </CharacterCardFrame>
  );
}
