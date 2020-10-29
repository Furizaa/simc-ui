import React from 'react';
import Card from '@shared/components/Card';
import { SimcExecutableCardProcessingStage } from './SimcExecutableCardStageDisplay';

export interface SimcExecutableCardFrameProps {
  onSelect?: () => void;
  children?: React.ReactNode;
  config: SimcExecutableCardProcessingStage;
}

export default function SimcExecutableCardFrame({ onSelect, children, config }: SimcExecutableCardFrameProps) {
  const { stage } = config;
  const cardOnClickHandler = onSelect && stage === 'ready' ? onSelect : undefined;

  return (
    <Card variant="clean" onClick={cardOnClickHandler} width="xs">
      {children}
    </Card>
  );
}
