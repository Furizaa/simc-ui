import { VStack } from '@chakra-ui/core';
import React from 'react';
import { SimProcess, Snapshot, SnapshotId } from '../../../../types';
import SnapshotTimelineEntry from '../SnapshotTimelineEntry';

export interface SnapshotTimelineProps {
  data: Array<{ snapshot: Snapshot; process: SimProcess }>;
  activeSnapshotId: string | undefined;
  onSelect?: (snapshotId: string) => void;
  onClickFreezeSnapshot?: (snapshotId: SnapshotId) => void;
}

export default function SnapshotTimeline({
  data,
  onClickFreezeSnapshot,
  activeSnapshotId,
  onSelect,
}: SnapshotTimelineProps) {
  const handleSelect = (snapshotId: string) => {
    if (onSelect) {
      onSelect(snapshotId);
    }
  };

  const handleFreezeSnapshot = (snapshotId: SnapshotId) => {
    if (onClickFreezeSnapshot) {
      onClickFreezeSnapshot(snapshotId);
    }
  };

  const sortedData = data.sort((a, b) => (a.snapshot.at < b.snapshot.at ? 1 : -1));

  return (
    <VStack py={2}>
      {sortedData.map(({ snapshot, process }, index) => {
        const processPrevious =
          data[index + 1] && data[index + 1].process.status.type === 'done' && process.status.type === 'done'
            ? data[index + 1].process
            : undefined;

        return (
          <SnapshotTimelineEntry
            key={snapshot.id}
            snapshot={snapshot}
            process={process}
            processPrevious={processPrevious}
            isActive={snapshot.id === activeSnapshotId}
            isRoot={index === data.length - 1}
            onFreezeSnapshot={handleFreezeSnapshot}
            onSelectSnapshot={handleSelect}
          />
        );
      })}
    </VStack>
  );
}
