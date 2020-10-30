import { Box, CircularProgress, HStack, Text, Tooltip } from '@chakra-ui/core';
import React from 'react';
import { CheckCircleIcon, TimeIcon } from '@chakra-ui/icons';
import { SimProcess, Snapshot } from '../../../../types';

export interface SnapshotCardProps {
  snapshot: Snapshot;
  process: SimProcess;
  onClick?: () => void;
  dpsDisplay?: string;
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

export default function SnapshotCard({ snapshot, onClick, process, dpsDisplay }: SnapshotCardProps) {
  const tooltipLabel = getTooltipLabel(process);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Box variant="clean" h="100%" d="flex" alignItems="center" p={2} onClick={handleClick}>
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
          {dpsDisplay && (
            <Text fontWeight="semibold" color="gray.100">
              {dpsDisplay}
            </Text>
          )}
        </Box>
      </HStack>
    </Box>
  );
}
