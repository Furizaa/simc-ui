import { Box, HStack, Text, VStack } from '@chakra-ui/core';
import React from 'react';
import { WOW } from '../../../../types';

export interface EquippedItemInstanceProps {
  name: string;
  quality: WOW.Quality;
  iconSrc: string;
  ilvl: number;
  enchantmentDisplays: string[];
  gemDisplays: string[];
  displayDirection?: 'left' | 'right';
}

export default function EquippedItemInstance({
  name,
  iconSrc,
  ilvl,
  quality,
  enchantmentDisplays,
  gemDisplays,
  displayDirection = 'left',
}: EquippedItemInstanceProps) {
  const flexDirection = displayDirection === 'right' ? 'row-reverse' : 'row';
  const textAlign = displayDirection === 'right' ? 'flex-end' : 'flex-start';
  const qualityColor = `itemQuality.${quality.toLowerCase()}`;

  return (
    <Box d="flex" alignItems="flex-start" flexDirection={flexDirection} w="100%">
      <Box boxSizing="content-box" borderWidth="1px" width="56px" height="56px" borderColor={qualityColor}>
        <img width="100%" height="100%" src={iconSrc} alt={name} />
      </Box>
      <Box w="0.4em" h="100%" />
      <VStack spacing={0} alignItems={textAlign}>
        <Text fontWeight="semibold" color={qualityColor}>
          {name}
        </Text>
        <HStack>
          {enchantmentDisplays.map((str) => (
            <Text key={str} fontSize="xs" color="green.300">
              {str}
            </Text>
          ))}
          {gemDisplays.map((str) => (
            <Text key={str} fontSize="xs" color="green.300">
              {str}
            </Text>
          ))}
        </HStack>
        <Text fontSize="xs" color="gray.400">
          {ilvl}
        </Text>
      </VStack>
    </Box>
  );
}
