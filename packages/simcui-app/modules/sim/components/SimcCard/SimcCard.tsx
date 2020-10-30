import React from 'react';

import SimcCardContent from './SimcCardContent';
import SimcCardFrame from './SimcCardFrame';

export interface SimcCardProps {
  onSelect?: () => void;
  simcConfigDisplay: string;
}

export default function SimcCard({ onSelect, simcConfigDisplay }: SimcCardProps) {
  return (
    <SimcCardFrame onSelect={onSelect}>
      <SimcCardContent simcConfigDisplay={simcConfigDisplay} />
    </SimcCardFrame>
  );
}
