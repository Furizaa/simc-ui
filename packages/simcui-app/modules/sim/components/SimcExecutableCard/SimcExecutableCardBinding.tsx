import React from 'react';
import { ExecutableOption, NativeDownloadEventData } from '../../../../types';
import useExecutableDownloader from '../../hooks/useExecutableDownloader';
import useExecutableStatus from '../../hooks/useExecutableStatus';
import SimcExecutableCard from './SimcExecutableCard';
import { SimcExecutableCardProcessingStage } from './SimcExecutableCardStageDisplay';

export interface SimcExecutableCardBindingProps {
  executable: ExecutableOption;
  onSelect?: () => void;
}

const determineCardConfig = (
  statusResult: boolean | null,
  downloadResult: NativeDownloadEventData | null,
): SimcExecutableCardProcessingStage => {
  if (downloadResult) {
    if (downloadResult.stage === 'downloading') {
      return {
        stage: 'downloading',
        percentage: downloadResult.percentage,
      };
    }
    if (downloadResult.stage === 'unpacking') {
      return {
        stage: 'unpacking',
      };
    }
    if (downloadResult.stage === 'done') {
      return {
        stage: 'ready',
      };
    }
  }

  if (statusResult === null) {
    return { stage: 'unknown' };
  }
  if (!statusResult) {
    return { stage: 'not-installed' };
  }

  return { stage: 'ready' };
};

export default function SimcExecutableCardBinding({ executable, onSelect }: SimcExecutableCardBindingProps) {
  const { data: statusData } = useExecutableStatus(executable.guid);
  const { initiateDownload, data: downloadData } = useExecutableDownloader(executable.guid);

  return (
    <SimcExecutableCard
      executable={executable}
      onSelect={onSelect}
      config={determineCardConfig(statusData, downloadData)}
      onDownloadClick={initiateDownload}
    />
  );
}
