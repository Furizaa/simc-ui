import React from 'react';
import { ExecutableOption } from '../../../../types';
import SimcExecutableCardContent from './SimcExecutableCardContent';
import SimcExecutableCardFrame from './SimcExecutableCardFrame';
import { SimcExecutableCardProcessingStage } from './SimcExecutableCardStageDisplay';

export interface SimcExecutableCardProps {
  executable: ExecutableOption;
  onSelect?: () => void;
  onDownloadClick?: () => void;
  config: SimcExecutableCardProcessingStage;
}

export default function SimcExecutableCard({ executable, onSelect, onDownloadClick, config }: SimcExecutableCardProps) {
  return (
    <SimcExecutableCardFrame onSelect={onSelect} config={config}>
      <SimcExecutableCardContent config={config} executable={executable} onDownloadClick={onDownloadClick} />
    </SimcExecutableCardFrame>
  );
}
