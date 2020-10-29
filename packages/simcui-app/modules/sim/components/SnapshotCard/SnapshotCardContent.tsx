import { Box, CircularProgress, Heading, HStack, Text, Tooltip } from '@chakra-ui/core';
import React from 'react';
import { formatRelative } from 'date-fns';
import { CheckCircleIcon, TimeIcon } from '@chakra-ui/icons';
import { SimProcess, Snapshot } from '../../../../types';

export interface SnapshotCardContentProps {
  snapshot: Snapshot;
  process: SimProcess;
}

const getTooltipLabel = (process: SimProcess) => {
  if (process.status.type === 'idle') {
    return 'Snapshot has not been simulated yet.';
  }
  if (process.status.type === 'running') {
    return `Simulation running (${process.status.percentage}%)`;
  }
  if (process.status.type === 'done') {
    return 'Snapshot has been simulated.';
  }
  return '';
};

const getStatusIcon = (process: SimProcess) => {
  if (process.status.type === 'running') {
    return (
      <CircularProgress
        size="18px"
        value={process.status.percentage}
        color="limegreen.500"
        capIsRound
        trackColor="translucent"
      />
    );
  }
  if (process.status.type === 'done') {
    return <CheckCircleIcon color="green.500" fontSize="lg" />;
  }
  return <TimeIcon color="gray.500" fontSize="lg" />;
};

export default function SnapshotCardContent({ snapshot, process }: SnapshotCardContentProps) {
  const tooltipLabel = getTooltipLabel(process);

  return (
    <HStack spacing={4}>
      {tooltipLabel && (
        <Tooltip label={tooltipLabel} hasArrow>
          {getStatusIcon(process)}
        </Tooltip>
      )}
      <Box>
        <Text fontWeight="semibold" color="gray.400" fontSize="xs">
          {snapshot.name}
        </Text>
        <Heading size="sm" fontWeight="bold" letterSpacing={0.8}>
          {formatRelative(new Date(snapshot.at), new Date())}
        </Heading>
      </Box>
    </HStack>
  );
}
