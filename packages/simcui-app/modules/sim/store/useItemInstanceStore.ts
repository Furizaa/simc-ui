import produce from 'immer';
import { ulid } from 'ulid';
import create, { GetState, SetState } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ItemInstance, WOW } from '../../../types';

export type ItemState = {
  list: Record<string, ItemInstance>;

  addItemInstance: (item: ItemInstance) => void;
  getItemInstance: (id?: string) => ItemInstance | undefined;
};

const store = (set: SetState<ItemState>, get: GetState<ItemState>) => ({
  list: {},

  addItemInstance: (item: ItemInstance) =>
    set((state) =>
      produce(state, (draft) => {
        draft.list[item.id] = item;
      }),
    ),

  getItemInstance: (id?: string) => {
    return id && id in get().list ? get().list[id] : undefined;
  },
});

export default create<ItemState>(devtools(store, 'ItemInstanceStore'));

export function createItemInstanceFromApi(item: WOW.PreviewItem): ItemInstance {
  return {
    id: ulid(),
    baseItemId: item.item.id,
    slot: item.slot.type,
    dropLvl: item.level.value,
    dropQuality: item.quality.type,
    bonusIds: item.bonus_list,
  };
}
