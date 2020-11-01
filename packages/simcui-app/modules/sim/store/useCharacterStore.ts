import create, { GetState, SetState } from 'zustand';
import { ulid } from 'ulid';
import { devtools } from 'zustand/middleware';
import produce from 'immer';
import { Character, CharacterId, SnapshotId, WOW } from '../../../types';

export type CharacterState = {
  list: Record<CharacterId, Character>;
  addCharacter: (character: Character, snapshotId: SnapshotId) => void;
  getCharacter: (characterId?: CharacterId) => Character | undefined;

  addSnapshotId: (characterId: CharacterId, snapshotId: SnapshotId) => void;
  removeSnapshotId: (characterId: CharacterId, snapshotId: SnapshotId) => void;
};

const store = (set: SetState<CharacterState>, get: GetState<CharacterState>) => ({
  list: {},
  selectedCharacterId: undefined,

  addCharacter: (character: Character, snapshotId: SnapshotId) => {
    return set(state =>
      produce(state, draft => {
        draft.list[character.id] = character;
        draft.list[character.id].snapshotIds.push(snapshotId);
      }),
    );
  },

  getCharacter: (characterId?: CharacterId) => {
    return characterId && characterId in get().list ? get().list[characterId] : undefined;
  },

  addSnapshotId: (characterId: CharacterId, snapshotId: SnapshotId) => {
    set(state => {
      if (state.list[characterId]) {
        return produce(state, draft => {
          draft.list[characterId].snapshotIds.push(snapshotId);
        });
      }
      return state;
    });
  },

  removeSnapshotId: (characterId: CharacterId, snapshotId: SnapshotId) => {
    set(state => {
      return produce(state, draft => {
        if (state.list[characterId]) {
          draft.list[characterId].snapshotIds = draft.list[characterId].snapshotIds.filter(id => id !== snapshotId);
        }
      });
    });
  },
});

export default create<CharacterState>(devtools(store, 'CharacterStore'));

export const createCharacterFromApi = (
  character: WOW.CharacterResponse,
  media: WOW.CharacterMediaResponse,
): Character => {
  const id = ulid();

  let backgroundRenderUrl;
  if (media.render_url) {
    backgroundRenderUrl = media.render_url;
  } else if (media.assets) {
    backgroundRenderUrl = media.assets.find(asset => asset.key === 'main')?.value ?? undefined;
  }

  return {
    id,
    wowId: character.id,
    name: character.name,
    classWowId: character.character_class.id,
    level: character.level,
    equippedItemLevel: character.equipped_item_level,
    backgroundRenderUrl,
    race: character.race.name,
    snapshotIds: [],
  };
};
