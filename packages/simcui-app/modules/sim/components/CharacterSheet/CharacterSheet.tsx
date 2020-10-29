import useSnapshotManager from '@sim/hooks/useSnapshotManager';
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
  const [character, snapshotId] = useCharacterStore(
    useCallback((store) => [store.getCharacter(characterId), store.getSelectedSnapshotId(characterId)], [characterId]),
  );
  const currentSnapshot = useSnapshotStore(useCallback((store) => store.getSnapshot(snapshotId), [snapshotId]));
  const equipment = useEquipmentStore(
    useCallback((store) => store.getEquipmentSet(currentSnapshot?.equipmentSetId), [currentSnapshot]),
  );
  const [currentTalentSet, activateTalent] = useTalentStore(
    useCallback((store) => [store.getTalentSet(currentSnapshot?.talentSetId), store.activateTalent], [currentSnapshot]),
  );
  const currentProcess = useSimProcessStore(
    useCallback((store) => store.getProcess(currentSnapshot?.simProcessId), [currentSnapshot]),
  );

  const { duplicateSnapshot } = useSnapshotManager(characterId);

  if (!character || !equipment) {
    return null;
  }

  const handleTalentClick = (talentId: number) => {
    if (currentSnapshot) {
      if (currentSnapshot.isFrozen) {
        const dupe = duplicateSnapshot(currentSnapshot.id);
        if (dupe) {
          activateTalent(dupe.talentSetId, talentId);
        }
      } else {
        activateTalent(currentSnapshot.talentSetId, talentId);
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
