import { Button, CircularProgress, CircularProgressLabel, HStack, Text, VStack } from '@chakra-ui/core';
import { RepeatClockIcon, SettingsIcon } from '@chakra-ui/icons';
import React from 'react';

export interface RunnerStatusProps {
  currentRun:
    | { status: 'idle' }
    | { status: 'queue' }
    | { status: 'running'; percentage: number }
    | { status: 'done'; dps: number }
    | { status: 'dirty'; dps: number }
    | undefined;

  onClickRun?: () => void;
}

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
      {currentRun && currentRun.status === 'queue' && (
        <HStack spacing={4}>
          <RepeatClockIcon color="blue.500" fontSize="2xl" />
          <VStack alignItems="flex-start" spacing={0}>
            <Text color="gray.200" fontWeight="semibold">
              Queued Requests
            </Text>
            <Text color="gray.200" fontSize="xs">
              Some Spells and Items are still beeing loaded from the WoW API. Please wait for them to finish before
              running a simulation.
            </Text>
          </VStack>
        </HStack>
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
        <Button onClick={handleClickRun} variant="outline" size="sm" isFullWidth>
          Rerun
        </Button>
      )}
      {currentRun && currentRun.status === 'dirty' && (
        <Button onClick={handleClickRun} colorScheme="gray" size="sm">
          Snapshot Changes & Run
        </Button>
      )}
    </>
  );
}
