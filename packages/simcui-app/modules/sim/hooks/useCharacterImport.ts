import { useState } from 'react';
import qs from 'querystring';
import manifest from '@cloud/gatewayManifest.json';
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

type UseCharacterLoader = [AsyncError, (params: WOW.CharacterRequestParams) => void];

export default function useCharacterLoader(): UseCharacterLoader {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AsyncError>(null);
  const addCharacter = useCharacterStore((store) => store.addCharacter);
  const addItemInstance = useItemInstanceStore((store) => store.addItemInstance);
  const addBaseItem = useBaseItemStore((store) => store.addBaseItem);
  const createSimProcess = useSimProcessStore((store) => store.createProcess);
  const [createEquipmentSet, equipItem, enchantItem] = useEquipmentStore((store) => [
    store.createEquipmentSet,
    store.equip,
    store.setEnchant,
  ]);
  const createSnapshot = useSnapshotStore((store) => store.createSnapshot);
  const addBaseEnchantment = useBaseEnchantStore((store) => store.addBaseEnchant);
  const [createTalentSet, replaceTalentSet] = useTalentStore((store) => [
    store.createTalentSet,
    store.replaceTalentSet,
  ]);
  const initializeClassTalents = useSpellStore((store) => store.initializeClassTalents);
  const [currentSimulationId, addCharacterToSimulation, selectCharacter] = useSimulationsStore((store) => [
    store.selectedSimulationId,
    store.addCharacterToSimulation,
    store.selectCharacter,
  ]);

  const loadCharacter = async (params: WOW.CharacterRequestParams) => {
    if (isLoading) {
      return;
    }

    setError(null);
    setIsLoading(true);

    const query = {
      region: params.region,
      'server-slug': params.realmSlug,
      'character-name': params.name,
    };

    const result = await fetch(`${manifest.bnetGatewayEndpoint}character?${qs.stringify(query)}`);
    const json = (await result.json()) as WOW.Result<WOW.CharacterRequestResult>;

    if (json.data && currentSimulationId) {
      const character = createCharacterFromApi(json.data.character, json.data.media);

      initializeClassTalents(character.classWowId);

      const equipmentSetId = createEquipmentSet();
      const talentSetId = createTalentSet(json.data.character.active_spec.id);

      const talentSet = createTalentSetFromApi(json.data.character, json.data.spec);
      if (talentSet) {
        replaceTalentSet(talentSetId, talentSet);
      }

      // Handle equipped items
      json.data.equipment.equipped_items.forEach((item) => {
        // Add base item of the equipped item
        addBaseItem(item.item.id);

        // Create a new item instance and equip it to the corresponding slot
        const itemInstance = createItemInstanceFromApi(item);
        addItemInstance(itemInstance);
        equipItem(equipmentSetId, itemInstance.slot, itemInstance.id);

        // Handle enchantments
        item.enchantments?.forEach((enchant) => {
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
      addCharacterToSimulation(currentSimulationId, character.id);
      selectCharacter(currentSimulationId, character.id);
    }

    setIsLoading(false);

    if (json.error) {
      setError(json.error);
    }
  };

  return [error, loadCharacter];
}
