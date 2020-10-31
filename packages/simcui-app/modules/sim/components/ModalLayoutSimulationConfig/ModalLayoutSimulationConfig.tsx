import {
  Box,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  Tabs,
} from '@chakra-ui/core';
import { useRouter } from '@shared/context/RouterContext';
import React from 'react';
import useModalStore, { SimModalType } from '../../store/useModalStore';
import FormSimulationPreset from '../FormSimulationPreset';

export default function ModalLayoutSimulationConfig() {
  const { currentRoute, push } = useRouter();
  const [currentOpenModal, closeAllModals] = useModalStore((store) => [store.currentOpenModal, store.closeAll]);

  const handleSimulationCreated = () => {
    closeAllModals();
    if (currentRoute === 'SIM_NEW_USER_EXPERIENCE') {
      push('SIM_HOME');
    }
  };

  return (
    <Modal size="2xl" isOpen={currentOpenModal === SimModalType.SIM_CREATE_CONFIGURATION} onClose={closeAllModals}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>Simulation Configuration</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid height="100%" templateColumns="200px auto">
              <Box bgColor="gray.900" h="100%" pb={1}>
                <Tabs size="md" variant="vertical" orientation="vertical">
                  <TabList>
                    <Tab>Sensible Presets</Tab>
                    <Tab disabled>Manual Configuration</Tab>
                  </TabList>
                </Tabs>
              </Box>
              <Box px={8} py={4}>
                <FormSimulationPreset onSimulationCreated={handleSimulationCreated} />
              </Box>
            </Grid>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
