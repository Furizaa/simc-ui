import useSnapshotManager from '@sim/hooks/useSnapshotManager';
import useInterfaceStateStore from '@sim/store/useInterfaceStateStore';
import React, { useCallback } from 'react';
import useCharacterStore from '../../store/useCharacterStore';
import useEquipmentStore from '../../store/useEquipmentStore';
import useSimProcessStore from '../../store/useSimProcessStore';
import useSnapshotStore from '../../store/useSnapshotStore';
import useTalentStore from '../../store/useTalentStore';
import CharacterBackground from '../CharacterBackground';
import CharacterTabs from '../CharacterTabs';
import EquipmentGrid from '../EquipmentGrid';
import EquippedItemInstanceBinding from '../EquippedItemInstance/EquippedItemInstanceBinding';
import RunnerResult from '../RunnerResult';
import TalentBinding from '../Talent/TalentBinding';
import TalentGrid from '../TalentGrid';
import TciFormBinding from '../TciForm/TciFormBinding';

export interface CharacterSheetProps {
  characterId: string;
}

export default function CharacterSheet({ characterId }: CharacterSheetProps) {
  const [character] = useCharacterStore(useCallback(store => [store.getCharacter(characterId)], [characterId]));
  const selectedSnapshotId = useInterfaceStateStore(
    useCallback(store => store.getSelectedSnapshotId(characterId), [characterId]),
  );
  const selectedSnapshot = useSnapshotStore(
    useCallback(store => store.getSnapshot(selectedSnapshotId), [selectedSnapshotId]),
  );
  const equipment = useEquipmentStore(
    useCallback(store => store.getEquipmentSet(selectedSnapshot?.equipmentSetId), [selectedSnapshot]),
  );
  const [currentTalentSet, activateTalent] = useTalentStore(
    useCallback(store => [store.getTalentSet(selectedSnapshot?.talentSetId), store.activateTalent], [selectedSnapshot]),
  );
  const currentProcess = useSimProcessStore(
    useCallback(store => store.getProcess(selectedSnapshot?.simProcessId), [selectedSnapshot]),
  );

  const { duplicateSnapshot } = useSnapshotManager(characterId);

  if (!character || !equipment) {
    return null;
  }

  const handleTalentClick = (talentId: number) => {
    if (selectedSnapshot) {
      if (selectedSnapshot.isFrozen) {
        const dupe = duplicateSnapshot(selectedSnapshot.id);
        if (dupe) {
          activateTalent(dupe.talentSetId, talentId);
        }
      } else {
        activateTalent(selectedSnapshot.talentSetId, talentId);
      }
    }
  };

  const equipmentNodes = Object.entries(equipment).reduce((prev, [slot, itemId]) => {
    if (!itemId) {
      return prev;
    }

    return {
      ...prev,
      [slot]: <EquippedItemInstanceBinding itemInstanceId={itemId} />,
    };
  }, {});

  return (
    <CharacterBackground minW="820px" overflowY="hidden" characterBackgroundUrl={character.backgroundRenderUrl}>
      <CharacterTabs
        equipmentPanel={<EquipmentGrid equipment={equipmentNodes} />}
        tciPanel={<TciFormBinding characterId={character.id} />}
        talentsPanel={
          currentTalentSet && (
            <TalentGrid
              characterClassId={character.classWowId}
              specId={currentTalentSet.specId}
              renderCell={({ spellId, talentId }) => (
                <TalentBinding
                  key={talentId}
                  spellId={spellId}
                  isActive={currentTalentSet.activeTalents.includes(talentId)}
                  onClick={() => handleTalentClick(talentId)}
                />
              )}
            />
          )
        }
        resultsPanel={
          currentProcess && currentProcess.status.type === 'done' && <RunnerResult process={currentProcess} />
        }
      />
    </CharacterBackground>
  );
}
