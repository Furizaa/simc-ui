import { Box, Button, Heading, Text, VStack } from '@chakra-ui/core';
import React from 'react';
import { useRouter } from '../../shared/context/RouterContext';

export default function Welcome() {
  const { push } = useRouter();
  return (
    <Box w="100%" h="100%" d="flex" alignItems="center" justifyContent="center">
      <VStack alignItems="start" w="lg">
        <Heading>Simulationcraft UI</Heading>
        <Text fontWeight="semibold" color="gray.400">
          This is your first time starting Simulationcraft. Get started by creating a new simulation.
        </Text>
        <Box />
        <Button size="lg" colorScheme="purple" onClick={() => push('SIM_CREATE_NEW')}>
          Create new Simulation
        </Button>
      </VStack>
    </Box>
  );
}
