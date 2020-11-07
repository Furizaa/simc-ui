import { Box, Text } from '@chakra-ui/core';
import React from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { TsFIXME } from 'types';
import VisPie from '../VisPie';

export interface GraphSkillDamageProps {
  simResult: Record<string, any>;
  colorScheme: string;
}

export default function GraphSkillDamage({ simResult, colorScheme }: GraphSkillDamageProps) {
  const data =
    simResult?.sim?.players?.[0]?.stats.map((stat: TsFIXME) => ({
      label: stat.spell_name,
      value: stat.total_amount?.mean ?? 0,
    })) ?? undefined;

  return (
    <Box bgColor="gray.800" p={4} width="100%" borderRadius="4px" boxShadow="dark-lg">
      <Text fontWeight="semibold">Skill Damage</Text>
      <Box w="100%" h="180px">
        {data && (
          <ParentSize className="graph-container" debounceTime={10}>
            {({ width: visWidth, height: visHeight }) => (
              <VisPie width={visWidth} height={visHeight} data={data} colorScheme={colorScheme} />
            )}
          </ParentSize>
        )}
      </Box>
    </Box>
  );
}
