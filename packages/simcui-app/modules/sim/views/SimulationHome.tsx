import { Box, Button, Grid } from '@chakra-ui/core';
import React, { useEffect } from 'react';
import { SimulationId, SnapshotId } from 'types';
import useSnapshotManager from '@sim/hooks/useSnapshotManager';
import SimulationTabs from '@sim/components/SimulationTabs';
import SnapshotTimeline from '@sim/components/SnapshotTimeline';
import ModalLayoutSimulationConfig from '@sim/components/ModalLayoutSimulationConfig';
import StatusBar from '@sim/components/StatusBar';
import shallow from 'zustand/shallow';
import useInterfaceStateStore from '@sim/store/useInterfaceStateStore';
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
  const [openModal] = useModalStore(store => [store.open]);

  const selectSimulationId = useInterfaceStateStore(store => store.setSelectedSimulationId);
  const selectCharacterId = useInterfaceStateStore(store => store.setSelectedCharacterId);
  const selectedSimulationId = useInterfaceStateStore(store => store.getSelectedSimulationId());
  const selectedCharacterId = useInterfaceStateStore(store =>
    selectedSimulationId ? store.getSelectedCharacterId(selectedSimulationId) : undefined,
  );
  const selectedSnapshotId = useInterfaceStateStore(store =>
    selectedCharacterId ? store.getSelectedSnapshotId(selectedCharacterId) : undefined,
  );

  const simulationList = useSimulationsStore(store => Object.values(store.list), shallow);
  const selectedSimulation = useSimulationsStore(store =>
    selectedSimulationId ? store.getSimulation(selectedSimulationId) : undefined,
  );

  const characterListInSimulation = useCharacterStore(
    store => Object.values(store.list).filter(char => selectedSimulation?.characterIds.includes(char.id)),
    shallow,
  );

  const { switchSnapshot, getSnapshotProcessMap, freezeSnapshotAndIdleProcess } = useSnapshotManager(
    selectedCharacterId,
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
    selectSimulationId(simulationId);
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
                {selectedSimulationId && selectedSimulation && selectedCharacterId && (
                  <CharacterDropdown
                    characterList={characterListInSimulation}
                    value={selectedCharacterId}
                    onSelect={id => selectCharacterId(selectedSimulationId, id ?? undefined)}
                    onCreateNewClick={handleImportCharacterClick}
                  />
                )}
                {!selectedCharacterId && (
                  <Button m={4} colorScheme="blue" onClick={handleImportCharacterClick}>
                    Create New Character
                  </Button>
                )}
                {selectedCharacterId && (
                  <SnapshotTimeline
                    data={getSnapshotProcessMap()}
                    activeSnapshotId={selectedSnapshotId}
                    onSelect={handleSelectSnapshotClick}
                    onClickFreezeSnapshot={handleFreezeSnapshotClick}
                  />
                )}
                {selectedSimulationId && selectedSnapshotId && selectedCharacterId && (
                  <Box d="flex" justifyContent="center" p={2}>
                    <RunnerStatusBinding
                      simulationId={selectedSimulationId}
                      snapshotId={selectedSnapshotId}
                      characterId={selectedCharacterId}
                    />
                  </Box>
                )}
              </Grid>
              <Box bgColor="gray.900">
                {selectedCharacterId && <CharacterSheet characterId={selectedCharacterId} />}
              </Box>
              <Box />
            </Grid>
          )}
        />
        <StatusBar />
      </Grid>
    </>
  );
}
