import produce from 'immer';
import create, { GetState, SetState } from 'zustand';
import { devtools } from 'zustand/middleware';
import dbTalents from '@dbc/dbTalentList.json';
import fetchQueue from '@sim/util/fetchQueue';
import { AsyncStore, Spell, WOW } from '../../../types';

export type SpellState = {
  list: Record<Spell['id'], AsyncStore<Spell>>;

  addSpell: (spellId: number) => Promise<void>;
  getSpell: (spellId: number) => AsyncStore<Spell>;

  initializeClassTalents: (classId: WOW.CharacterClassId) => void;
};

const processAsyncResult = (result: AsyncStore<WOW.SpellRequestResult>): AsyncStore<Spell> => {
  if (result.data) {
    const icon = result.data.media.assets.find(asset => asset.key === 'icon')?.value ?? undefined;
    const spell = { ...result.data.spell, icon };
    return { status: 'done', data: spell, error: null };
  }
  return (result as unknown) as AsyncStore<Spell>;
};

const store = (set: SetState<SpellState>, get: GetState<SpellState>) => ({
  list: {},

  addSpell: async (spellId: number) => {
    const query = {
      type: 'spell',
      params: {
        region: 'eu',
        spellId,
      },
    };

    fetchQueue<WOW.SpellRequestResult>({
      body: query,
      onUpdate: update => {
        set(state =>
          produce(state, draft => {
            draft.list[spellId] = processAsyncResult(update);
          }),
        );
      },
    });
  },

  getSpell: (spellId: number): AsyncStore<Spell> => {
    const spell = get().list[spellId];
    if (!spell) {
      get().addSpell(spellId);
      return { status: 'loading', data: null, error: null };
    }
    return spell;
  },

  initializeClassTalents: (classId: WOW.CharacterClassId) => {
    Object.values(dbTalents)
      .filter(talent => talent.playable_class.id === classId)
      .forEach(talent => get().addSpell(talent.spell.id));
  },
});

export default create<SpellState>(devtools(store, 'SpellStore'));
