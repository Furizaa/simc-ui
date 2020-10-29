import React from 'react';
import Breadcrumb from '@shared/components/Breadcrumb';
import { BreadcrumbValue } from '@shared/components/Breadcrumb/Breadcrumb';
import { SimProcess, Snapshot, SnapshotId } from '../../../../types';
import SnapshotCardContent from '../SnapshotCard/SnapshotCardContent';
import SnapshotTimeline from '../SnapshotTimeline';

export interface SnapshotDropdownProps {
  onSelect?: (value: BreadcrumbValue) => void;
  onFreezeSnapshotClick?: (snapshotId: SnapshotId) => void;
  value: BreadcrumbValue;
  data: Array<{ snapshot: Snapshot; process: SimProcess }>;
}

export default function SnapshotDropdown({ onSelect, onFreezeSnapshotClick, value, data }: SnapshotDropdownProps) {
  const selectedEntry = value ? data.find((entry) => entry.snapshot.id === value) : undefined;

  const handleCreateNewClick = (snapshotId: SnapshotId) => {
    if (onFreezeSnapshotClick) {
      onFreezeSnapshotClick(snapshotId);
    }
  };

  return (
    <Breadcrumb
      label="Select Snapshot"
      onSelect={onSelect}
      value={value}
      placement="bottom"
      renderItems={({ handleSelect }) => (
        <SnapshotTimeline
          data={data}
          activeSnapshotId={value}
          onSelect={handleSelect}
          onClickFreezeSnapshot={handleCreateNewClick}
        />
      )}
      renderSelectedItem={() => {
        if (selectedEntry) {
          return <SnapshotCardContent snapshot={selectedEntry.snapshot} process={selectedEntry.process} />;
        }

        return null;
      }}
    />
  );
}
