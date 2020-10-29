import React from 'react';
import useTCI from '../../hooks/useTCI';
import TciForm from './TciForm';

export interface TciFormBindingProps {
  characterId: string;
}

export default function TciFormBinding({ characterId }: TciFormBindingProps) {
  const tci = useTCI({ characterId });
  return <TciForm tci={tci} />;
}
