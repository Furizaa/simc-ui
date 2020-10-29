import { Box, Grid } from '@chakra-ui/core';
import React, { useEffect } from 'react';
import { SnapshotId } from 'types';
import useSnapshotManager from '@sim/hooks/useSnapshotManager';
import { useRouter } from '../../shared/context/RouterContext';
import SimcDropdown from '../components/SimcDropdown';
import useSimulationsStore from '../store/useSimulationsStore';
import premadeSimulationConfigs from '../../data/simConfigs';
import ModalLayoutCharacterImport from '../components/ModalLayoutCharacterImport';
import useModalStore, { SimModalType } from '../store/useModalStore';
import useCharacterStore from '../store/useCharacterStore';
import CharacterSheet from '../components/CharacterSheet';
import BreadcrumbBar from '../../shared/components/BreadcrumbBar';
import CharacterDropdown from '../components/CharacterDropdown';
import { BreadcrumbValue } from '../../shared/components/Breadcrumb/Breadcrumb';
import SnapshotDropdown from '../components/SnapshotDropdown';
import RunnerStatusBinding from '../components/RunnerStatus/RunnerStatusBinding';

export default function SimulationHome() {
  const { push } = useRouter();
  const [openModal] = useModalStore((store) => [store.open]);
  const characterIdList = useSimulationsStore((store) => store.getCharacterIdsInSelectedSimulation());
  const [simulationRecord, selectedSimulationId, selectSimulation] = useSimulationsStore((store) => [
    store.list,
    store.selectedSimulationId,
    store.selectSimulation,
  ]);
  const characterListInCurrentSimulation = useCharacterStore((store) =>
    Object.values(store.list).filter((char) => characterIdList.includes(char.id)),
  );
  const [currentCharacterId, selectCharacter] = useCharacterStore((store) => [
    store.selectedCharacterId,
    store.selectCharacter,
  ]);
  const currentCharacterSelectedSnapshot = useCharacterStore((store) =>
    store.getSelectedSnapshotId(currentCharacterId),
  );

  const { switchSnapshot, getSnapshotProcessMap, freezeSnapshotAndIdleProcess } = useSnapshotManager(
    currentCharacterId,
  );

  const isEmpty = Object.keys(simulationRecord).length === 0;

  useEffect(() => {
    if (isEmpty) {
      push('SIM_NEW_USER_EXPERIENCE');
    }
  });

  if (isEmpty) {
    return null;
  }

  const handleSimulationSelection = (value: BreadcrumbValue) => {
    if (typeof value === 'string') {
      selectSimulation(value);
    }
  };

  const handleCreateNewSimulationClick = () => {
    push('SIM_CREATE_NEW');
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

      <Grid height="100%" templateRows="auto 1fr">
        <BreadcrumbBar>
          <SimcDropdown
            value={selectedSimulationId}
            simulationConfigList={premadeSimulationConfigs}
            simulationParameterList={Object.values(simulationRecord)}
            onSelect={handleSimulationSelection}
            onCreateNewClick={handleCreateNewSimulationClick}
          />
          <CharacterDropdown
            characterList={characterListInCurrentSimulation}
            value={currentCharacterId}
            onSelect={(id) => selectCharacter(id ?? undefined)}
            onCreateNewClick={handleImportCharacterClick}
          />
          {currentCharacterId && (
            <SnapshotDropdown
              data={getSnapshotProcessMap()}
              value={currentCharacterSelectedSnapshot}
              onSelect={handleSelectSnapshotClick}
              onFreezeSnapshotClick={handleFreezeSnapshotClick}
            />
          )}

          {selectedSimulationId && currentCharacterSelectedSnapshot && currentCharacterId && (
            <Box d="flex" flexGrow={1} justifyContent="flex-end" px={4}>
              <Box maxW="xs">
                <RunnerStatusBinding
                  simulationId={selectedSimulationId}
                  snapshotId={currentCharacterSelectedSnapshot}
                  characterId={currentCharacterId}
                />
              </Box>
            </Box>
          )}
        </BreadcrumbBar>
        {currentCharacterId && <CharacterSheet characterId={currentCharacterId} />}
      </Grid>
    </>
  );
}
