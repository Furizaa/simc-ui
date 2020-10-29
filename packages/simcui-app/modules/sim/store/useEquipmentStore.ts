import produce from 'immer';
import { ulid } from 'ulid';
import create, { GetState, SetState } from 'zustand';
import { devtools } from 'zustand/middleware';
import { EquipmentSet, ItemInstance, WOW, Enchant, EquipmentSetId } from '../../../types';

const EMPTY_SET = {
  HEAD: undefined,
  NECK: undefined,
  SHOULDER: undefined,
  CHEST: undefined,
  WAIST: undefined,
  LEGS: undefined,
  FEET: undefined,
  WRIST: undefined,
  HANDS: undefined,
  FINGER_1: undefined,
  FINGER_2: undefined,
  TRINKET_1: undefined,
  TRINKET_2: undefined,
  BACK: undefined,
  MAIN_HAND: undefined,
  OFF_HAND: undefined,
  TABARD: undefined,
  SHIRT: undefined,
};

export type EquipmentStore = {
  list: Record<EquipmentSetId, EquipmentSet>;
  enchants: Record<EquipmentSetId, EquipmentSet<Enchant['id'] | undefined>>;

  createEquipmentSet: () => EquipmentSetId;
  duplicateEquipmentSet: (setId?: EquipmentSetId) => EquipmentSetId;

  getEquipmentSet: (setId?: EquipmentSetId) => EquipmentSet | undefined;
  getEquipmentSetEnchants: (setId?: EquipmentSetId) => EquipmentSet<Enchant['id'] | undefined> | undefined;

  equip: (setId: EquipmentSetId, slot: WOW.Slot, itemId: ItemInstance['id']) => void;
  unequip: (setId: EquipmentSetId, slot: WOW.Slot) => void;

  setEnchant: (setId: EquipmentSetId, slot: WOW.Slot, enchantId: Enchant['id']) => void;
};

const store = (set: SetState<EquipmentStore>, get: GetState<EquipmentStore>) => ({
  list: {},
  enchants: {},

  createEquipmentSet: () => {
    const id = ulid();
    set((state) =>
      produce(state, (draft) => {
        draft.list[id] = EMPTY_SET;
        draft.enchants[id] = EMPTY_SET;
      }),
    );
    return id;
  },

  duplicateEquipmentSet: (setId?: EquipmentSetId) => {
    const sourceSet = get().getEquipmentSet(setId);
    const sourceEnchants = get().getEquipmentSetEnchants(setId);
    const id = ulid();
    set((state) =>
      produce(state, (draft) => {
        draft.list[id] = sourceSet ? { ...sourceSet } : EMPTY_SET;
        draft.enchants[id] = sourceEnchants ? { ...sourceEnchants } : EMPTY_SET;
      }),
    );
    return id;
  },

  getEquipmentSet: (setId?: EquipmentSetId) => {
    return setId && setId in get().list ? get().list[setId] : undefined;
  },

  getEquipmentSetEnchants: (setId?: EquipmentSetId) => {
    return setId && setId in get().enchants ? get().enchants[setId] : undefined;
  },

  equip: (setId: EquipmentSetId, slot: WOW.Slot, itemId: ItemInstance['id']) => {
    return set((state) =>
      produce(state, (draft) => {
        draft.list[setId] = draft.list[setId] ?? {};
        draft.list[setId][slot] = itemId;
      }),
    );
  },

  unequip: (setId: EquipmentSetId, slot: WOW.Slot) => {
    return set((state) =>
      produce(state, (draft) => {
        draft.list[setId] = draft.list[setId] ?? {};
        draft.list[setId][slot] = undefined;
      }),
    );
  },

  setEnchant: (setId: EquipmentSetId, slot: WOW.Slot, enchantId: Enchant['id']) => {
    return set((state) =>
      produce(state, (draft) => {
        draft.enchants[setId] = draft.enchants[setId] ?? {};
        draft.enchants[setId][slot] = enchantId;
      }),
    );
  },
});

export default create<EquipmentStore>(devtools(store, 'EquipmentStore'));
