import React from 'react';
import Card from '@shared/components/Card';

export interface SnapshotCardFrameProps {
  onSelect?: () => void;
  children: React.ReactNode;
}

export default function SnapshotCardFrame({ children, onSelect }: SnapshotCardFrameProps) {
  return (
    <Card variant="solid" onClick={onSelect}>
      {children}
    </Card>
  );
}
