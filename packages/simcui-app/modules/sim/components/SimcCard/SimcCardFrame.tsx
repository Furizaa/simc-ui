import React from 'react';
import Card from '@shared/components/Card';

export interface SimcCardFrameProps {
  onSelect?: () => void;
  children?: React.ReactNode;
}

export default function SimcCardFrame({ onSelect, children }: SimcCardFrameProps) {
  return (
    <Card variant="clean" onClick={onSelect} width="xs">
      {children}
    </Card>
  );
}
