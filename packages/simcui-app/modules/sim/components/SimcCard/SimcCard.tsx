import React from 'react';

import SimcCardContent from './SimcCardContent';
import SimcCardFrame from './SimcCardFrame';

export interface SimcCardProps {
  onSelect?: () => void;
  simcVersionDisplay: string;
  simcConfigDisplay: string;
  gameVersionDisplay: string;
  gameVersionColor: string;
}

export default function SimcCard({
  onSelect,
  simcVersionDisplay,
  gameVersionDisplay,
  gameVersionColor,
  simcConfigDisplay,
}: SimcCardProps) {
  return (
    <SimcCardFrame onSelect={onSelect}>
      <SimcCardContent
        simcVersionDisplay={simcVersionDisplay}
        gameVersionColor={gameVersionColor}
        gameVersionDisplay={gameVersionDisplay}
        simcConfigDisplay={simcConfigDisplay}
      />
    </SimcCardFrame>
  );
}
