import { Box, Button, Grid } from '@chakra-ui/core';
import React, { useEffect } from 'react';
import { SimulationId, SnapshotId } from 'types';
import useSnapshotManager from '@sim/hooks/useSnapshotManager';
import SimulationTabs from '@sim/components/SimulationTabs';
import SnapshotTimeline from '@sim/components/SnapshotTimeline';
import ModalLayoutSimulationConfig from '@sim/components/ModalLayoutSimulationConfig';
import StatusBar from '@sim/components/StatusBar';
import { useRouter } from '../../shared/context/RouterContext';
import useSimulationsStore from '../store/useSimulationsStore';
import ModalLayoutCharacterImport from '../components/ModalLayoutCharacterImport';
import useModalStore, { SimModalType } from '../store/useModalStore';
import useCharacterStore from '../store/useCharacterStore';
import CharacterSheet from '../components/CharacterSheet';
import CharacterDropdown from '../components/CharacterDropdown';
import RunnerStatusBinding from '../components/RunnerStatus/RunnerStatusBinding';

export default function SimulationHome() {
  const { push } = useRouter();
  const [openModal] = useModalStore((store) => [store.open]);

  const [characterIdList, simulationList, selectedSimulationId, selectSimulation] = useSimulationsStore((store) => [
    store.getCharacterIdsInSelectedSimulation(),
    Object.values(store.list),
    store.selectedSimulationId,
    store.selectSimulation,
  ]);

  const [currentCharacterId, selectCharacter] = useSimulationsStore((store) => [
    store.getSelectedCharacterId(selectedSimulationId),
    store.selectCharacter,
  ]);

  const characterListInCurrentSimulation = useCharacterStore((store) =>
    Object.values(store.list).filter((char) => characterIdList.includes(char.id)),
  );

  const currentCharacterSelectedSnapshot = useCharacterStore((store) =>
    store.getSelectedSnapshotId(currentCharacterId),
  );

  const { switchSnapshot, getSnapshotProcessMap, freezeSnapshotAndIdleProcess } = useSnapshotManager(
    currentCharacterId,
  );

  const isEmpty = simulationList.length === 0;

  useEffect(() => {
    if (isEmpty) {
      push('SIM_NEW_USER_EXPERIENCE');
    }
  });

  if (isEmpty) {
    return null;
  }

  const handleSimulationSelection = (simulationId: SimulationId) => {
    selectSimulation(simulationId);
  };

  const handleCreateNewSimulationClick = () => {
    openModal(SimModalType.SIM_CREATE_CONFIGURATION);
  };

  const handleImportCharacterClick = () => {
    openModal(SimModalType.SIM_IMPORT_CHARACTER);
  };

  const handleSelectSnapshotClick = (snapshotId?: SnapshotId) => {
    if (snapshotId) {
      switchSnapshot(snapshotId);
    }
  };

  const handleFreezeSnapshotClick = (snapshotId: SnapshotId) => {
    freezeSnapshotAndIdleProcess(snapshotId);
  };

  return (
    <>
      <ModalLayoutCharacterImport />
      <ModalLayoutSimulationConfig />

      <Grid h="100%" templateRows="1fr auto">
        <SimulationTabs
          simulations={simulationList}
          selectedSimulationId={selectedSimulationId}
          onSelectSimulation={handleSimulationSelection}
          onClickAddSimulation={handleCreateNewSimulationClick}
          renderTabPanel={() => (
            <Grid height="100%" templateColumns="18rem 1fr auto">
              <Grid bgColor="gray.800" borderRight="1px solid" borderRightColor="gray.900" templateRows="auto 1fr auto">
                {currentCharacterId && (
                  <CharacterDropdown
                    characterList={characterListInCurrentSimulation}
                    value={currentCharacterId}
                    onSelect={(id) => selectCharacter(selectedSimulationId, id ?? undefined)}
                    onCreateNewClick={handleImportCharacterClick}
                  />
                )}
                {!currentCharacterId && (
                  <Button m={4} colorScheme="blue" onClick={handleImportCharacterClick}>
                    Create New Character
                  </Button>
                )}
                {currentCharacterId && (
                  <SnapshotTimeline
                    data={getSnapshotProcessMap()}
                    activeSnapshotId={currentCharacterSelectedSnapshot}
                    onSelect={handleSelectSnapshotClick}
                    onClickFreezeSnapshot={handleFreezeSnapshotClick}
                  />
                )}
                {selectedSimulationId && currentCharacterSelectedSnapshot && currentCharacterId && (
                  <Box d="flex" justifyContent="center" p={2}>
                    <RunnerStatusBinding
                      simulationId={selectedSimulationId}
                      snapshotId={currentCharacterSelectedSnapshot}
                      characterId={currentCharacterId}
                    />
                  </Box>
                )}
              </Grid>
              <Box bgColor="gray.900">{currentCharacterId && <CharacterSheet characterId={currentCharacterId} />}</Box>
              <Box />
            </Grid>
          )}
        />
        <StatusBar />
      </Grid>
    </>
  );
}
