import React, { useCallback } from 'react';
import useSpellStore from '../../store/useSpellStore';
import SpellIconLoading from '../SpellIconLoading';
import SpellIconQueue from '../SpellIconQueue';
import Talent from './Talent';

export interface TalentBindingProps {
  spellId: number;
  isActive?: boolean;
  onClick?: () => void;
}

export default function TalentBinding({ spellId, isActive, onClick }: TalentBindingProps) {
  const asyncSpell = useSpellStore(useCallback(store => store.getSpell(spellId), [spellId]));

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  if (asyncSpell.status === 'queue') {
    return <SpellIconQueue size="md" />;
  }
  if (asyncSpell.status === 'done' && asyncSpell.data) {
    return (
      <Talent
        name={asyncSpell.data.name.en_US}
        iconSrc={asyncSpell.data.icon}
        isActive={isActive}
        onClick={handleClick}
      />
    );
  }

  return <SpellIconLoading size="md" />;

  // TODO error state
  return null;
}
