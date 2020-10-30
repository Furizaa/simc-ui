import { Box, Button, FormControl, FormHelperText, FormLabel, Heading, VStack } from '@chakra-ui/core';
import React from 'react';

export interface FormLayoutNewSimulationProps {
  configurationComponent: React.ReactNode;
  isComplete?: boolean;
  onClickComplete: () => void;
}

export default function FormLayoutNewSimulation({
  configurationComponent,
  isComplete,
  onClickComplete,
}: FormLayoutNewSimulationProps) {
  const handleOnComplete = () => {
    if (onClickComplete) {
      onClickComplete();
    }
  };

  return (
    <>
      <Heading mb={5} as="h1" size="2xl">
        Create New Simulation
      </Heading>
      <VStack ml={3} width="100%" pl={2} align="start">
        <FormControl width="100%">
          <FormLabel variant="large">Configuration</FormLabel>
          <FormHelperText maxW="xl">
            Choose a configuration that best fits your needs. Configuration options include things like fight style,
            fight length, consumables or even your ping.
          </FormHelperText>
          <Box my={3}>{configurationComponent}</Box>
        </FormControl>
        <Button type="submit" disabled={!isComplete} onClick={handleOnComplete} colorScheme="indigo">
          Finish
        </Button>
      </VStack>
    </>
  );
}
