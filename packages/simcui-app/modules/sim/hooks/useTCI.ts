import { useCallback, useMemo } from 'react';
import dbProfiles from '@dbc/dbProfiles.json';
import dbClassList from '@dbc/dbClassList.json';
import dbTalents from '@dbc/dbTalentList.json';
import useInterfaceStateStore from '@sim/store/useInterfaceStateStore';
import useCharacterStore from '../store/useCharacterStore';
import useSnapshotStore from '../store/useSnapshotStore';
import useTalentStore from '../store/useTalentStore';
import { WOW } from '../../../types';
import useTCISlots from './useTCISlots';

export interface UseTCIProps {
  characterId: string;
}

const serializeTCI = (tci: Record<string, unknown>) => {
  let outStr = '';
  Object.entries(tci).forEach(([key, value]) => {
    if (typeof value === 'string') {
      outStr += `${key}=${value}\n`;
    } else if (Array.isArray(value)) {
      value.forEach((subValue, index) => {
        if (index === 0) {
          outStr += `${key}=${subValue}\n`;
        } else {
          outStr += `${key}+=${subValue}\n`;
        }
      });
    }
  });
  return outStr;
};

export default function useTCI({ characterId }: UseTCIProps) {
  const selectedSnapshotId = useInterfaceStateStore(useCallback(store => store.getSelectedSnapshotId(characterId), []));
  const [currentCharacter] = useCharacterStore(useCallback(store => [store.getCharacter(characterId)], [characterId]));
  const currentSnapshot = useSnapshotStore(
    useCallback(store => store.getSnapshot(selectedSnapshotId), [selectedSnapshotId]),
  );
  const slots = useTCISlots({ equipmentSetId: currentSnapshot?.equipmentSetId });
  const currentTalentSet = useTalentStore(
    useCallback(store => store.getTalentSet(currentSnapshot?.talentSetId), [currentSnapshot]),
  );

  // Translate selected talents to a tiered list of column indexes (1032113)
  // while 0 means that no talent has been selected in this tier.
  // (tci sure is wierd)
  const tieredTalentList = useMemo(() => {
    if (!currentCharacter) {
      return [];
    }

    return [...Array(7).keys()].map(tier => {
      const selectedTalentForTier = Object.values(dbTalents).find(
        talent =>
          ('playable_specialization' in talent
            ? talent.playable_specialization.id === currentTalentSet?.specId
            : talent.playable_class.id === currentCharacter.classWowId) &&
          talent.tier_index === tier &&
          currentTalentSet?.activeTalents.includes(talent.id),
      );
      return selectedTalentForTier ? selectedTalentForTier.column_index + 1 : 0;
    });
  }, [currentTalentSet, currentCharacter]);

  if (!currentCharacter || !currentTalentSet || !currentTalentSet || !currentSnapshot) {
    return '';
  }

  const profile = (dbProfiles as Record<string, any>)[`${currentTalentSet.specId}`];
  const characterClass = (dbClassList as Record<string, { name: WOW.LocalizedString }>)[
    `${currentCharacter.classWowId}`
  ];

  if (!profile || !characterClass) {
    return '';
  }

  profile[characterClass.name.en_US.toLowerCase()] = `"${currentSnapshot.id}"`;
  profile.level = currentCharacter.level;
  profile.race = currentCharacter.race.en_US.toLowerCase();
  profile.talents = tieredTalentList.join('');

  return serializeTCI({ ...profile, ...slots });
}
