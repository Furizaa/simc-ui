import { Progress, Text } from '@chakra-ui/core';
import React from 'react';

export type SimcExecutableCardProcessingStage =
  | {
      percentage: number;
      stage: 'downloading';
    }
  | {
      stage: 'unpacking' | 'ready' | 'not-installed' | 'unknown';
    };

export interface SimcExecutableCardProps {
  config: SimcExecutableCardProcessingStage;
}

export default function SimcExecutableCardStageDisplay({ config }: SimcExecutableCardProps) {
  const { stage } = config;

  if (stage === 'unpacking') {
    return <Progress colorScheme="indigo" isIndeterminate />;
  }
  if (stage === 'downloading' && 'percentage' in config) {
    return <Progress colorScheme="indigo" value={config.percentage ?? 0} />;
  }
  if (stage === 'ready') {
    return (
      <Text fontSize="xs" color="gray.500">
        Installed
      </Text>
    );
  }
  if (stage === 'unknown') {
    return (
      <Text fontSize="xs" color="gray.500">
        Checking availabillity...
      </Text>
    );
  }

  return (
    <Text fontSize="xs" color="gray.500">
      Click button to install
    </Text>
  );
}
