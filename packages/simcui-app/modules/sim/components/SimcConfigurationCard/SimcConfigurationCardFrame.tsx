import React from 'react';
import Card from '@shared/components/Card';

export interface SimcConfigurationCardFrameProps {
  onSelect?: () => void;
  children?: React.ReactNode;
}

export default function SimcConfigurationCardFrame({ onSelect, children }: SimcConfigurationCardFrameProps) {
  return (
    <Card variant="clean" onClick={onSelect} width="xs">
      {children}
    </Card>
  );
}
