import produce from 'immer';
import { ulid } from 'ulid';
import create, { GetState, SetState } from 'zustand';
import { devtools } from 'zustand/middleware';
import talentDb from '@dbc/dbTalentList.json';
import { TalentSet, TalentSetId, WOW } from '../../../types';

export type TalentStore = {
  list: Record<TalentSetId, TalentSet>;

  createTalentSet: (specId: number) => TalentSetId;
  replaceTalentSet: (talentSetId: TalentSetId, talentSet: TalentSet) => void;
  duplicateTalentSet: (talentSetId: TalentSetId) => TalentSetId;
  getTalentSet: (talentSetId?: TalentSetId) => TalentSet | undefined;

  activateTalent: (talentSetId: TalentSetId, talentId: number) => void;
};

const store = (set: SetState<TalentStore>, get: GetState<TalentStore>) => ({
  list: {},

  createTalentSet: (specId: number) => {
    const id = ulid();
    set((state) =>
      produce(state, (draft) => {
        draft.list[id] = {
          specId,
          activeTalents: [],
        };
      }),
    );
    return id;
  },

  replaceTalentSet: (talentSetId: TalentSetId, talentSet: TalentSet) =>
    set((state) =>
      produce(state, (draft) => {
        draft.list[talentSetId] = talentSet;
      }),
    ),

  duplicateTalentSet: (talentSetId: TalentSetId) => {
    const id = ulid();
    set((state) =>
      produce(state, (draft) => {
        const talentSet = get().list[talentSetId];

        if (talentSet) {
          draft.list[id] = {
            specId: talentSet.specId,
            activeTalents: talentSet.activeTalents,
          };
        } else {
          throw new Error("Fatal: Can't copy empty talent set.");
        }
      }),
    );
    return id;
  },

  getTalentSet: (talentSetId?: TalentSetId) => {
    return talentSetId && talentSetId in get().list ? get().list[talentSetId] : undefined;
  },

  activateTalent: (talentSetId: TalentSetId, talentId: number) => {
    set((state) =>
      produce(state, (draft) => {
        const talentSet = get().getTalentSet(talentSetId);

        if (!talentSet) {
          return;
        }

        // There are already talents in this snapshot and spec so we have to figure out
        // which talents are on the same tier so we can deselect them as only one
        // talent is allowed per tier.
        const baseTalent = Object.values(talentDb).find((talent) => talent.id === talentId);
        if (baseTalent) {
          // Filter the db for the talent ids that are in the same tier, spec and class
          const talentIdsInSameTier = Object.values(talentDb)
            .filter(
              (talent) =>
                ('playable_specialization' in talent
                  ? talent.playable_specialization.id === talentSet.specId
                  : talent.playable_class.id === baseTalent.playable_class.id) &&
                talent.tier_index === baseTalent.tier_index,
            )
            .map((talent) => talent.id);

          // Now we have a list of talents in this spec without the ones in the tier the
          // talent to activate is part of.
          const talentIdsWithTierRemoved =
            talentSet.activeTalents.filter((id) => !talentIdsInSameTier.includes(id)) ?? [];

          // Update the draft
          draft.list[talentSetId] = {
            specId: talentSet.specId,
            activeTalents: [...talentIdsWithTierRemoved, talentId],
          };
        }
      }),
    );
  },
});

export default create<TalentStore>(devtools(store, 'TalentStore'));

export function createTalentSetFromApi(
  charResponse: WOW.CharacterResponse,
  specResponse: WOW.CharacterSpecsResponse,
): TalentSet | undefined {
  const activeSpec = specResponse.specializations.find(
    (spec) => spec.specialization.id === charResponse.active_spec.id,
  );
  if (!activeSpec) {
    return undefined;
  }
  return {
    specId: activeSpec.specialization.id,
    activeTalents: activeSpec.talents.map((talent) => talent.talent.id),
  };
}
