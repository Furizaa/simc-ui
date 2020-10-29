import { Box, Text, VStack } from '@chakra-ui/core';
import React from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { SimProcess } from '../../../../types';
import VisDpsOverFight from '../VisDpsOverFight';

export interface RunnerResultProps {
  process: SimProcess;
}

export default function RunnerResult({ process }: RunnerResultProps) {
  if (process.status.type !== 'done') {
    return null;
  }

  const { result } = process.status;

  return (
    <VStack p={4}>
      <Box bgColor="gray.800" p={4} width="100%" borderRadius="4px" boxShadow="dark-lg">
        <Text fontWeight="semibold">Damage / Second</Text>
        <Box w="100%" h="180px">
          <ParentSize className="graph-container" debounceTime={10}>
            {({ width: visWidth, height: visHeight }) => (
              <VisDpsOverFight
                width={visWidth}
                height={visHeight}
                data={result?.sim?.players[0]?.collected_data?.timeline_dmg?.data ?? []}
              />
            )}
          </ParentSize>
        </Box>
      </Box>
    </VStack>
  );
}
