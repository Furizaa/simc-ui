import React, { useCallback } from 'react';
import useSpellStore from '../../store/useSpellStore';
import SpellIconLoading from '../SpellIconLoading';
import Talent from './Talent';

export interface TalentBindingProps {
  spellId: number;
  isActive?: boolean;
  onClick?: () => void;
}

export default function TalentBinding({ spellId, isActive, onClick }: TalentBindingProps) {
  const asyncSpell = useSpellStore(useCallback((store) => store.getSpell(spellId), [spellId]));

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  if (asyncSpell.status !== 'done') {
    return <SpellIconLoading size="md" />;
  }
  if (asyncSpell.data) {
    return (
      <Talent
        name={asyncSpell.data.name.en_US}
        iconSrc={asyncSpell.data.icon}
        isActive={isActive}
        onClick={handleClick}
      />
    );
  }

  // TODO error state
  return null;
}
