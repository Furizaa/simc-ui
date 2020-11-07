import { Box, Text } from '@chakra-ui/core';
import React from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import VisLineGraph from '../VisLineGraph';

export interface GraphDpsProps {
  simResult: Record<string, any>;
}

export default function GraphDps({ simResult }: GraphDpsProps) {
  const data = simResult.sim?.players[0]?.collected_data?.timeline_dmg?.data ?? undefined;

  return (
    <Box bgColor="gray.800" p={4} width="100%" borderRadius="4px" boxShadow="dark-lg">
      <Text fontWeight="semibold">Damage / Second</Text>
      <Box w="100%" h="180px">
        {data && (
          <ParentSize className="graph-container" debounceTime={10}>
            {({ width: visWidth, height: visHeight }) => (
              <VisLineGraph
                width={visWidth}
                height={visHeight}
                data={simResult.sim?.players[0]?.collected_data?.timeline_dmg?.data ?? []}
                colorScheme="green"
              />
            )}
          </ParentSize>
        )}
      </Box>
    </Box>
  );
}
