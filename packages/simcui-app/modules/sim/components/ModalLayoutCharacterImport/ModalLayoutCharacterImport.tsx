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
import React from 'react';
import useModalStore, { SimModalType } from '../../store/useModalStore';
import FormImportCharacter from '../FormImportCharacter/FormImportCharacter';

export default function ModalLayoutCharacterImport() {
  const [currentOpenModal, closeAllModals] = useModalStore((store) => [store.currentOpenModal, store.closeAll]);

  return (
    <Modal size="2xl" isOpen={currentOpenModal === SimModalType.SIM_IMPORT_CHARACTER} onClose={closeAllModals}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>New Character / Guild</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid height="100%" templateColumns="200px auto">
              <Box bgColor="gray.900" h="100%" pb={1}>
                <Tabs size="md" variant="vertical" orientation="vertical">
                  <TabList>
                    <Tab>Character from Armory</Tab>
                    <Tab disabled>Guild from Armory</Tab>
                    <Tab disabled>Premade Character</Tab>
                    <Tab disabled>Simulationcraft Addon</Tab>
                    <Tab disabled>Recent Imports</Tab>
                    <Tab disabled>Previous Simulation</Tab>
                  </TabList>
                </Tabs>
              </Box>
              <Box px={8} py={4}>
                <FormImportCharacter onLoadedCharacter={closeAllModals} />
              </Box>
            </Grid>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
