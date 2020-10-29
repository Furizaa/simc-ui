import React from 'react';

import SimcConfigurationCardContent from './SimcConfigurationCardContent';
import SimcConfigurationCardFrame from './SimcConfigurationCardFrame';

export interface SimcConfigurationCardProps {
  name: string;
  description: string;
  onSelect?: () => void;
}

export default function SimcConfigurationCard({ name, description, onSelect }: SimcConfigurationCardProps) {
  return (
    <SimcConfigurationCardFrame onSelect={onSelect}>
      <SimcConfigurationCardContent name={name} description={description} />
    </SimcConfigurationCardFrame>
  );
}
