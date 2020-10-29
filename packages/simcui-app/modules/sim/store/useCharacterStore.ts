import create, { GetState, SetState } from 'zustand';
import { ulid } from 'ulid';
import { devtools } from 'zustand/middleware';
import produce from 'immer';
import { Character, CharacterId, SnapshotId, WOW } from '../../../types';

export type CharacterState = {
  list: Record<CharacterId, Character>;
  selectedCharacterId: CharacterId | undefined;
  addCharacter: (character: Character, snapshotId: SnapshotId) => void;
  getCharacter: (characterId?: CharacterId) => Character | undefined;
  selectCharacter: (characterId: CharacterId | undefined) => void;
  getSelectedCharacter: () => Character | undefined;

  // Character -> Snapshot

  snapshotsInCharacter: Record<CharacterId, SnapshotId[]>;
  selectedSnapshotForCharacter: Record<CharacterId, SnapshotId>;
  addSnapshotId: (characterId: CharacterId, snapshotId: SnapshotId) => void;
  removeSnapshotId: (characterId: CharacterId, snapshotId: SnapshotId) => void;
  selectSnapshotId: (characterId: CharacterId, snapshotId: SnapshotId) => void;
  getSelectedSnapshotId: (characterId?: CharacterId) => SnapshotId | undefined;
};

const store = (set: SetState<CharacterState>, get: GetState<CharacterState>) => ({
  list: {},
  selectedCharacterId: undefined,

  addCharacter: (character: Character, snapshotId: SnapshotId) => {
    return set((state) =>
      produce(state, (draft) => {
        draft.list[character.id] = character;
        draft.selectedCharacterId = character.id;
        draft.snapshotsInCharacter[character.id] = [snapshotId];
        draft.selectedSnapshotForCharacter[character.id] = snapshotId;
      }),
    );
  },

  getCharacter: (characterId?: CharacterId) => {
    return characterId && characterId in get().list ? get().list[characterId] : undefined;
  },

  selectCharacter: (characterId?: CharacterId) =>
    set((state) => {
      if (characterId && characterId in state.list) {
        return {
          selectedCharacterId: characterId,
        };
      }
      return {
        selectedCharacterId: undefined,
      };
    }),

  getSelectedCharacter: () => {
    const { selectedCharacterId } = get();
    return selectedCharacterId && selectedCharacterId in get().list ? get().list[selectedCharacterId] : undefined;
  },

  // Character -> Snapshot

  selectedSnapshotForCharacter: {},
  snapshotsInCharacter: {},

  addSnapshotId: (characterId: CharacterId, snapshotId: SnapshotId) => {
    set((state) => {
      if (state.snapshotsInCharacter[characterId]) {
        return produce(state, (draft) => {
          draft.snapshotsInCharacter[characterId].push(snapshotId);
        });
      }
      return state;
    });
  },

  removeSnapshotId: (characterId: CharacterId, snapshotId: SnapshotId) => {
    set((state) => {
      return produce(state, (draft) => {
        if (state.snapshotsInCharacter[characterId]) {
          draft.snapshotsInCharacter[characterId] = draft.snapshotsInCharacter[characterId].filter(
            (id) => id !== snapshotId,
          );
        }
        // Deselect snapshot if the one deleted is the one selected
        if (state.selectedSnapshotForCharacter[characterId] === snapshotId) {
          delete draft.selectedSnapshotForCharacter[characterId];
        }
      });
    });
  },

  selectSnapshotId: (characterId: CharacterId, snapshotId: SnapshotId) => {
    set((state) => {
      if (state.snapshotsInCharacter[characterId] && state.snapshotsInCharacter[characterId].includes(snapshotId)) {
        return produce(state, (draft) => {
          draft.selectedSnapshotForCharacter[characterId] = snapshotId;
        });
      }
      return state;
    });
  },

  getSelectedSnapshotId: (characterId?: CharacterId) => {
    return characterId && characterId in get().selectedSnapshotForCharacter
      ? get().selectedSnapshotForCharacter[characterId]
      : undefined;
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
    backgroundRenderUrl = media.assets.find((asset) => asset.key === 'main')?.value ?? undefined;
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
  };
};
