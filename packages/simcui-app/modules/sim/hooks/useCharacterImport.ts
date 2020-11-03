import { useEffect, useRef, useState } from 'react';
import manifest from '@cloud/gatewayManifest.json';
import useInterfaceStateStore from '@sim/store/useInterfaceStateStore';
import { AsyncError, WOW } from '../../../types';
import useCharacterStore, { createCharacterFromApi } from '../store/useCharacterStore';
import useEquipmentStore from '../store/useEquipmentStore';
import useItemInstanceStore, { createItemInstanceFromApi } from '../store/useItemInstanceStore';
import useBaseItemStore from '../store/useBaseItemStore';
import useSimulationsStore from '../store/useSimulationsStore';
import useSnapshotStore from '../store/useSnapshotStore';
import useSpellStore from '../store/useSpellStore';
import useBaseEnchantStore, { createBaseEnchantmentFromEquipmentApi } from '../store/useBaseEnchantStore';
import useSimProcessStore from '../store/useSimProcessStore';
import useTalentStore, { createTalentSetFromApi } from '../store/useTalentStore';

type UseCharacterLoader = [AsyncError, (params: WOW.CharacterRequestBody, cb: () => void) => void, boolean, number];

const QUEUE_GRACE_PERIOD_MS = 1250;
const QUEUE_RETRY_PERIOD_MS = 3000;
const QUEUE_RETRY_COUNT = 3;

export default function useCharacterLoader(): UseCharacterLoader {
  const timeoutRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [queueWaitMs, setQueueWaitMs] = useState(0);
  const [error, setError] = useState<AsyncError>(null);

  const [selectedSimulationId, setSelectedCharacterId, setSelectedSnapshotId] = useInterfaceStateStore(store => [
    store.getSelectedSimulationId(),
    store.setSelectedCharacterId,
    store.setSelectedSnapshotId,
  ]);

  const addCharacter = useCharacterStore(store => store.addCharacter);
  const addItemInstance = useItemInstanceStore(store => store.addItemInstance);
  const addBaseItem = useBaseItemStore(store => store.addBaseItem);
  const createSimProcess = useSimProcessStore(store => store.createProcess);
  const [createEquipmentSet, equipItem, enchantItem] = useEquipmentStore(store => [
    store.createEquipmentSet,
    store.equip,
    store.setEnchant,
  ]);
  const createSnapshot = useSnapshotStore(store => store.createSnapshot);
  const addBaseEnchantment = useBaseEnchantStore(store => store.addBaseEnchant);
  const [createTalentSet, replaceTalentSet] = useTalentStore(store => [store.createTalentSet, store.replaceTalentSet]);
  const initializeClassTalents = useSpellStore(store => store.initializeClassTalents);
  const [addCharacterToSimulation] = useSimulationsStore(store => [store.addCharacterToSimulation]);

  useEffect(
    () => () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    },
    [],
  );

  const handleImport = (json: WOW.Result<WOW.CharacterRequestResult>): boolean => {
    if (json.data && selectedSimulationId) {
      const character = createCharacterFromApi(json.data.character, json.data.media);

      initializeClassTalents(character.classWowId);

      const equipmentSetId = createEquipmentSet();
      const talentSetId = createTalentSet(json.data.character.active_spec.id);

      const talentSet = createTalentSetFromApi(json.data.character, json.data.spec);
      if (talentSet) {
        replaceTalentSet(talentSetId, talentSet);
      }

      // Handle equipped items
      json.data.equipment.equipped_items.forEach(item => {
        // Add base item of the equipped item
        addBaseItem(item.item.id);

        // Create a new item instance and equip it to the corresponding slot
        const itemInstance = createItemInstanceFromApi(item);
        addItemInstance(itemInstance);
        equipItem(equipmentSetId, itemInstance.slot, itemInstance.id);

        // Handle enchantments
        item.enchantments?.forEach(enchant => {
          // Add all enchantment source items to the base item store
          if (enchant.source_item) {
            addBaseItem(enchant.source_item.id);
          }

          // Create enchantment and add it to the enchantment store
          const enchantment = createBaseEnchantmentFromEquipmentApi(enchant);
          addBaseEnchantment(enchantment);

          // Enchant equipped item
          enchantItem(equipmentSetId, itemInstance.slot, enchantment.id);
        });
      });

      const simProcessId = createSimProcess();

      const newSnapshotId = createSnapshot({
        name: 'Armory Import',
        isFrozen: true,
        equipmentSetId,
        simProcessId,
        talentSetId,
      });

      addCharacter(character, newSnapshotId);
      addCharacterToSimulation(selectedSimulationId, character.id);
      setSelectedCharacterId(selectedSimulationId, character.id);
      setSelectedSnapshotId(character.id, newSnapshotId);

      setIsLoading(false);
      return true;
    }

    if (json.error) {
      setIsLoading(false);
      setError(json.error);
    }
    return false;
  };

  const checkQueueStatus = async (token: string, tryCount: number, cb: () => void) => {
    const result = await fetch(`${manifest.bnetGatewayEndpoint}queue?token=${token}`);
    const json = (await result.json()) as WOW.QueuedLookupResult<WOW.Result<WOW.CharacterRequestResult>>;
    if (json.status === 'DONE') {
      setQueueWaitMs(0);
      if (handleImport(json.payload)) {
        cb();
      }

      return;
    }
    if (json.status === 'QUEUE' && tryCount <= QUEUE_RETRY_COUNT) {
      setQueueWaitMs(QUEUE_RETRY_PERIOD_MS);
      timeoutRef.current = setTimeout(() => checkQueueStatus(token, tryCount + 1, cb), QUEUE_RETRY_PERIOD_MS);
      return;
    }
    setQueueWaitMs(0);
    setIsLoading(false);
    setError({ code: 500, text: 'Error loading character: Queue didn\t respond.' });
  };

  const loadCharacter = async (params: WOW.CharacterRequestBody, cb: () => void) => {
    if (isLoading) {
      return;
    }

    setError(null);
    setIsLoading(true);
    setQueueWaitMs(0);

    const queueBody = {
      type: 'character',
      params,
    };

    const result = await fetch(`${manifest.bnetGatewayEndpoint}queue`, {
      method: 'POST',
      body: JSON.stringify(queueBody),
    });
    const json = (await result.json()) as WOW.QueuedResult<WOW.CharacterRequestResult>;

    if ('token' in json) {
      const queueTime = json.waitTimeSeconds * 1000 + QUEUE_GRACE_PERIOD_MS;
      setQueueWaitMs(queueTime);
      timeoutRef.current = setTimeout(() => checkQueueStatus(json.token, 0, cb), queueTime);
    } else {
      setError({ code: 500, text: 'Error loading character: Queue is offline.' });
    }
  };

  return [error, loadCharacter, isLoading, queueWaitMs];
}
