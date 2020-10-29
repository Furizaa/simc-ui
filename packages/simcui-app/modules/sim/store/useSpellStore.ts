import produce from 'immer';
import qs from 'querystring';
import create, { GetState, SetState } from 'zustand';
import { devtools } from 'zustand/middleware';
import dbTalents from '@dbc/dbTalentList.json';
import manifest from '@cloud/gatewayManifest.json';
import { AsyncStore, Spell, WOW } from '../../../types';

export type SpellState = {
  list: Record<Spell['id'], AsyncStore<Spell>>;

  addSpell: (spellId: number) => Promise<void>;
  getSpell: (spellId: number) => AsyncStore<Spell>;

  initializeClassTalents: (classId: WOW.CharacterClassId) => void;
};

const store = (set: SetState<SpellState>, get: GetState<SpellState>) => ({
  list: {},

  addSpell: async (spellId: number) => {
    set((state) =>
      produce(state, (draft) => {
        draft.list[spellId] = { status: 'loading', data: null, error: null };
      }),
    );

    const query = {
      // We don't care from which region items are loaded UwU
      region: 'eu',
      'spell-id': spellId,
    };

    const result = await fetch(`${manifest.bnetGatewayEndpoint}spell?${qs.stringify(query)}`);
    const json = (await result.json()) as WOW.Result<WOW.SpellRequestResult>;

    if (json.error) {
      set((state) =>
        produce(state, (draft) => {
          draft.list[spellId] = { status: 'done', data: null, error: json.error };
        }),
      );
      return;
    }

    if (json.data) {
      const icon = json.data.media.assets.find((asset) => asset.key === 'icon')?.value ?? undefined;
      const spell = { ...json.data.spell, icon };
      set((state) =>
        produce(state, (draft) => {
          draft.list[spellId] = { status: 'done', data: spell, error: null };
        }),
      );
      return;
    }

    // Unknown Response
    set((state) =>
      produce(state, (draft) => {
        draft.list[spellId] = { status: 'done', data: null, error: { code: 500, text: 'Unknown response.' } };
      }),
    );
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
      .filter((talent) => talent.playable_class.id === classId)
      .forEach((talent) => get().addSpell(talent.spell.id));
  },
});

export default create<SpellState>(devtools(store, 'SpellStore'));
