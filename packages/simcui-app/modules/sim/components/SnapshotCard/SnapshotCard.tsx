import React from 'react';
import { SimProcess, Snapshot } from '../../../../types';
import SnapshotCardFrame from './SnapshotCardFrame';
import SnapshotCardContent from './SnapshotCardContent';

export interface SnapshotCardProps {
  snapshot: Snapshot;
  process: SimProcess;
  onClick?: () => void;
}

export default function SnapshotCard({ snapshot, process, onClick }: SnapshotCardProps) {
  return (
    <SnapshotCardFrame onSelect={onClick}>
      <SnapshotCardContent snapshot={snapshot} process={process} />
    </SnapshotCardFrame>
  );
}
