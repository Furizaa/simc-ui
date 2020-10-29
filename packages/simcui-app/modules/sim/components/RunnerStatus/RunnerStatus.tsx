import { Button, CircularProgress, CircularProgressLabel, HStack, Text } from '@chakra-ui/core';
import { SettingsIcon } from '@chakra-ui/icons';
import React from 'react';

export interface RunnerStatusProps {
  currentRun:
    | { status: 'idle' }
    | { status: 'running'; percentage: number }
    | { status: 'done'; dps: number }
    | { status: 'dirty'; dps: number }
    | undefined;

  onClickRun?: () => void;
}

const dpsFormatter = new Intl.NumberFormat('en-US', { style: 'decimal' });

export default function RunnerStatus({ currentRun, onClickRun }: RunnerStatusProps) {
  const handleClickRun = () => {
    if (onClickRun) {
      onClickRun();
    }
  };

  return (
    <>
      {(!currentRun || currentRun.status === 'idle') && (
        <Button onClick={handleClickRun} leftIcon={<SettingsIcon />} colorScheme="green">
          Run Simulation
        </Button>
      )}
      {currentRun && currentRun.status === 'running' && (
        <HStack>
          <Text color="limegreen.500" fontWeight="semibold">
            Simulating
          </Text>
          <CircularProgress value={currentRun.percentage} color="limegreen.500" capIsRound trackColor="translucent">
            <CircularProgressLabel color="limegreen.500">
              {`${Math.floor(currentRun.percentage)}%`}
            </CircularProgressLabel>
          </CircularProgress>
        </HStack>
      )}
      {currentRun && currentRun.status === 'done' && (
        <HStack>
          <Text color="limegreen.500" fontWeight="black">
            {`${dpsFormatter.format(Math.ceil(currentRun.dps))} DPS`}
          </Text>
          <Button onClick={handleClickRun} variant="outline" size="sm">
            Rerun
          </Button>
        </HStack>
      )}
      {currentRun && currentRun.status === 'dirty' && (
        <HStack>
          <Text color="gray.400" fontWeight="black">
            {`${dpsFormatter.format(Math.ceil(currentRun.dps))} DPS`}
          </Text>
          <Button onClick={handleClickRun} colorScheme="green" size="sm">
            Snapshot Changes & Rerun
          </Button>
        </HStack>
      )}
    </>
  );
}
