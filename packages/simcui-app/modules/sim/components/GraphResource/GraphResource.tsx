import { Box, Text } from '@chakra-ui/core';
import React from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import VisLineGraph from '../VisLineGraph';

export interface GraphResourceProps {
  simResult: Record<string, any>;
  label: string;
  colorScheme: string;
  resourceKey: string;
}

export default function GraphResource({ simResult, label, colorScheme, resourceKey }: GraphResourceProps) {
  const data = simResult.sim?.players[0]?.collected_data?.resource_timelines?.[resourceKey]?.data ?? undefined;

  return (
    <Box bgColor="gray.800" p={4} width="100%" borderRadius="4px" boxShadow="dark-lg">
      <Text fontWeight="semibold">{label}</Text>
      <Box w="100%" h="180px">
        {data && (
          <ParentSize className="graph-container" debounceTime={10}>
            {({ width: visWidth, height: visHeight }) => (
              <VisLineGraph width={visWidth} height={visHeight} data={data} colorScheme={colorScheme} />
            )}
          </ParentSize>
        )}
      </Box>
    </Box>
  );
}
