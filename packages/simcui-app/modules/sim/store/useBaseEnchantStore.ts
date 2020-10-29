import produce from 'immer';
import create, { GetState, SetState } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Enchant, EnchantId, WOW } from '../../../types';

export type EnchantStore = {
  list: Record<EnchantId, Enchant>;

  addBaseEnchant: (enchant: Enchant) => void;
  getBaseEnchant: (id?: EnchantId) => Enchant | undefined;
};

const store = (set: SetState<EnchantStore>, get: GetState<EnchantStore>) => ({
  list: {},

  addBaseEnchant: (enchant: Enchant) =>
    set((state) =>
      produce(state, (draft) => {
        draft.list[enchant.id] = enchant;
      }),
    ),

  getBaseEnchant: (id?: EnchantId) => {
    return id && id in get().list ? get().list[id] : undefined;
  },
});

export default create<EnchantStore>(devtools(store, 'BaseEnchantStore'));

export function createBaseEnchantmentFromEquipmentApi(enchant: WOW.PreviewEnchantment): Enchant {
  return {
    id: enchant.enchantment_id,
    name: enchant.display_string,
    sourceItemId: enchant.source_item?.id,
  };
}
