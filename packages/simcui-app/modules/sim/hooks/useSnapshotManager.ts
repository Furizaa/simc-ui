import useCharacterStore from '@sim/store/useCharacterStore';
import useEquipmentStore from '@sim/store/useEquipmentStore';
import useSimProcessStore from '@sim/store/useSimProcessStore';
import useSnapshotStore from '@sim/store/useSnapshotStore';
import useTalentStore from '@sim/store/useTalentStore';
import { useCallback } from 'react';
import { CharacterId, EquipmentSetId, SimProcess, SimProcessId, Snapshot, SnapshotId, TalentSetId } from 'types';

type DuplicateSnapshotResult =
  | {
      snapshotId: SnapshotId;
      equipmentSetId: EquipmentSetId;
      simProcessId: SimProcessId;
      talentSetId: TalentSetId;
    }
  | undefined;

export default function useSnapshotManager(characterId?: CharacterId) {
  const [snapshotList, createSnapshot, removeSnapshot, getSnapshot, freezeSnapshot] = useSnapshotStore(
    useCallback(
      (store) => [store.list, store.createSnapshot, store.removeSnapshot, store.getSnapshot, store.freezeSnapshot],
      [],
    ),
  );
  const [
    selectSnapshot,
    addSnapshotToCharacter,
    removeSnapshotFromCharacter,
    getSelectedSnapshotId,
    snapshotsInCharacter,
  ] = useCharacterStore(
    useCallback(
      (store) => [
        store.selectSnapshotId,
        store.addSnapshotId,
        store.removeSnapshotId,
        store.getSelectedSnapshotId,
        characterId ? store.snapshotsInCharacter[characterId] : [],
      ],
      [characterId],
    ),
  );
  const duplicateEquipmentSet = useEquipmentStore(useCallback((store) => store.duplicateEquipmentSet, []));
  const [duplicateSimProcess, getProcess, setProcessStatus] = useSimProcessStore(
    useCallback((store) => [store.duplicateProcess, store.getProcess, store.setProcessStatus], []),
  );
  const duplicateTalentSet = useTalentStore(useCallback((store) => store.duplicateTalentSet, []));

  const duplicateSnapshot = useCallback(
    (sourceSnapshotId: SnapshotId): DuplicateSnapshotResult => {
      const sourceSnapshot = snapshotList[sourceSnapshotId];
      if (!sourceSnapshot || !sourceSnapshot.isFrozen || !characterId) {
        return undefined;
      }

      const newEquipmentSetId = duplicateEquipmentSet(sourceSnapshot.equipmentSetId);
      const newTalentSetId = duplicateTalentSet(sourceSnapshot.talentSetId);
      const newSimProcessId = duplicateSimProcess(sourceSnapshot.simProcessId);

      const newSnapshotId = createSnapshot({
        isFrozen: false,
        name: 'new snapshot',
        equipmentSetId: newEquipmentSetId,
        simProcessId: newSimProcessId,
        talentSetId: newTalentSetId,
      });

      addSnapshotToCharacter(characterId, newSnapshotId);
      selectSnapshot(characterId, newSnapshotId);

      return {
        snapshotId: newSnapshotId,
        equipmentSetId: newEquipmentSetId,
        simProcessId: newSimProcessId,
        talentSetId: newTalentSetId,
      };
    },
    [snapshotList, characterId],
  );

  const switchSnapshot = useCallback(
    (targetSnapshotId: SnapshotId) => {
      if (characterId) {
        // Remove the currently selected snapshot if not frozen
        const currentSnapshotId = getSelectedSnapshotId(characterId);
        const currentSnapshot = currentSnapshotId ? snapshotList[currentSnapshotId] : undefined;
        if (currentSnapshot && !currentSnapshot.isFrozen) {
          removeSnapshotFromCharacter(characterId, currentSnapshot.id);
          removeSnapshot(currentSnapshot.id);
        }

        selectSnapshot(characterId, targetSnapshotId);
      }
    },
    [snapshotList, characterId],
  );

  const getSnapshotProcessMap = useCallback(() => {
    return snapshotsInCharacter
      .map((snapshotId) => {
        const snapshot = getSnapshot(snapshotId);
        const process = snapshot && getProcess(snapshot.simProcessId);
        if (snapshot && process) {
          return { snapshot, process };
        }
        return undefined;
      })
      .filter(Boolean) as Array<{ snapshot: Snapshot; process: SimProcess }>;
  }, [snapshotsInCharacter]);

  const freezeSnapshotAndIdleProcess = useCallback((snapshotId: SnapshotId) => {
    const snapshot = getSnapshot(snapshotId);
    if (snapshot) {
      freezeSnapshot(snapshot.id);
      setProcessStatus(snapshot.simProcessId, { type: 'idle' });
    }
  }, []);

  return { duplicateSnapshot, switchSnapshot, getSnapshotProcessMap, freezeSnapshotAndIdleProcess };
}
