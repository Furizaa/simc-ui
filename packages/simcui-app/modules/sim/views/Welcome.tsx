import { Box, Button, Heading, Text, VStack } from '@chakra-ui/core';
import ModalLayoutSimulationConfig from '@sim/components/ModalLayoutSimulationConfig';
import useModalStore, { SimModalType } from '@sim/store/useModalStore';
import React, { useCallback } from 'react';

export default function Welcome() {
  const openModal = useModalStore(useCallback((store) => store.open, []));

  return (
    <>
      <ModalLayoutSimulationConfig />
      <Box w="100%" h="100%" d="flex" alignItems="center" justifyContent="center">
        <VStack alignItems="start" w="lg">
          <Heading>Simulationcraft UI</Heading>
          <Text fontWeight="semibold" color="gray.400">
            This is your first time starting Simulationcraft. Get started by creating a new simulation.
          </Text>
          <Box />
          <Button size="lg" colorScheme="blue" onClick={() => openModal(SimModalType.SIM_CREATE_CONFIGURATION)}>
            Create new Simulation
          </Button>
        </VStack>
      </Box>
    </>
  );
}
