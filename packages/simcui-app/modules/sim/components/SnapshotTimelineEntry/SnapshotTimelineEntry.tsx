import { Box, Button, Grid, Text } from '@chakra-ui/core';
import { formatDistance } from 'date-fns';
import Card from '@shared/components/Card';
import React from 'react';
import { SimProcess, Snapshot, SnapshotId } from 'types';
import SnapshotCard from '../SnapshotCard';

export interface SnapshotTimelineEntryProps {
  isActive: boolean;
  isRoot: boolean;
  onFreezeSnapshot?: (snapshotId: SnapshotId) => void;
  onSelectSnapshot?: (snapshotId: SnapshotId) => void;
  snapshot: Snapshot;
  process: SimProcess;
  processPrevious?: SimProcess;
}

const dpsFormatter = new Intl.NumberFormat('en-US', { style: 'decimal' });
const formatDps = (dps: number) => dpsFormatter.format(Math.ceil(dps));

export default function SnapshotTimelineEntry({
  isActive,
  isRoot,
  onSelectSnapshot,
  onFreezeSnapshot,
  snapshot,
  process,
  processPrevious,
}: SnapshotTimelineEntryProps) {
  const handleFreezeSnapshotClick = () => {
    if (onFreezeSnapshot) {
      onFreezeSnapshot(snapshot.id);
    }
  };

  const handleSelectSnapshotClick = () => {
    if (onSelectSnapshot) {
      onSelectSnapshot(snapshot.id);
    }
  };

  const meanDps =
    process.status.type === 'done'
      ? process.status.result?.sim?.players[0]?.collected_data?.dps?.mean ?? undefined
      : undefined;

  const prevMeanDps =
    processPrevious && processPrevious.status.type === 'done'
      ? processPrevious.status.result?.sim?.players[0]?.collected_data?.dps?.mean ?? undefined
      : undefined;

  if (!snapshot.isFrozen) {
    return (
      <Grid templateColumns="120px 20px 1fr 100px" columnGap={2} w="lg" h="64px">
        <Box d="flex" alignItems="center" justifyContent="flex-end">
          <Text fontSize="xs" color="gray.400" fontWeight="semibold">
            current
          </Text>
        </Box>
        <Box d="flex" alignItems="center">
          <Box
            w="20px"
            h="20px"
            borderRadius="full"
            borderColor="gray.700"
            borderWidth="2px"
            bgColor="gray.900"
            pos="relative"
            _after={
              !isRoot
                ? {
                    pos: 'absolute',
                    content: '""',
                    borderLeftWidth: '1px',
                    borderRightWidth: '1px',
                    borderColor: 'gray.700',
                    top: '18px',
                    left: 'calc(50% - 1px)',
                    w: '1px',
                    h: '70px',
                  }
                : undefined
            }
          />
        </Box>
        <Card variant="outline" d="flex" justifyContent="center" onClick={handleFreezeSnapshotClick}>
          <Button size="sm">Save Changes</Button>
        </Card>
        <Box />
      </Grid>
    );
  }

  return (
    <Grid templateColumns="120px 20px 1fr 100px" columnGap={2} w="lg" h="64px">
      <Box d="flex" alignItems="center" justifyContent="flex-end">
        <Text w="" fontSize="xs" color={isActive ? 'blue.200' : 'blue.400'} fontWeight="semibold">
          {formatDistance(new Date(snapshot.at), new Date())}
        </Text>
      </Box>
      <Box d="flex" alignItems="center">
        <Box
          w="20px"
          h="20px"
          borderRadius="full"
          borderColor={isActive ? 'blue.500' : 'blue.500'}
          borderWidth="2px"
          bgColor={isActive ? 'blue.300' : 'gray.900'}
          pos="relative"
          _after={
            !isRoot
              ? {
                  pos: 'absolute',
                  content: '""',
                  borderLeftWidth: '1px',
                  borderRightWidth: '1px',
                  borderColor: 'blue.500',
                  top: '18px',
                  left: 'calc(50% - 1px)',
                  w: '1px',
                  h: '70px',
                }
              : undefined
          }
        />
      </Box>
      <Box h="67px">
        <SnapshotCard snapshot={snapshot} process={process} onClick={handleSelectSnapshotClick} />
      </Box>
      <Box d="flex" alignItems="center">
        <Box>
          {meanDps ? (
            <Text fontSize="lg" fontWeight="semibold" color="gray.200">
              {`${formatDps(meanDps)} DPS`}
            </Text>
          ) : null}
          {prevMeanDps && prevMeanDps < meanDps ? (
            <Text fontSize="xs" fontWeight="bold" color="limegreen.400">
              {`(+ ${formatDps(meanDps - prevMeanDps)} DPS)`}
            </Text>
          ) : null}
          {prevMeanDps && prevMeanDps > meanDps ? (
            <Text fontSize="xs" fontWeight="bold" color="red.400">
              {`(- ${formatDps(prevMeanDps - meanDps)} DPS)`}
            </Text>
          ) : null}
        </Box>
      </Box>
    </Grid>
  );
}
