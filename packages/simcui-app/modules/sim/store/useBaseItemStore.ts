import produce from 'immer';
import create, { GetState, SetState } from 'zustand';
import { devtools } from 'zustand/middleware';
import fetchQueue from '@sim/util/fetchQueue';
import { AsyncStore, BaseItem, BaseItemId, WOW } from '../../../types';

export type BaseItemState = {
  list: Record<BaseItemId, AsyncStore<BaseItem>>;

  addBaseItem: (baseItemId: BaseItemId) => void;
  getBaseItem: (baseItemId?: BaseItemId) => AsyncStore<BaseItem> | undefined;
};

const processAsyncResult = (result: AsyncStore<WOW.ItemRequestResult>): AsyncStore<BaseItem> => {
  if (result.data) {
    const icon = result.data.media.assets.find(asset => asset.key === 'icon')?.value ?? undefined;
    const baseItem = { ...result.data.item, icon };
    return { status: 'done', data: baseItem, error: null };
  }
  return (result as unknown) as AsyncStore<BaseItem>;
};

const store = (set: SetState<BaseItemState>, get: GetState<BaseItemState>) => ({
  list: {},

  addBaseItem: async (baseItemId: number) => {
    const query = {
      type: 'item',
      params: {
        region: 'eu',
        itemId: baseItemId,
      },
    };

    fetchQueue<WOW.ItemRequestResult>({
      body: query,
      onUpdate: update => {
        set(state =>
          produce(state, draft => {
            draft.list[baseItemId] = processAsyncResult(update);
          }),
        );
      },
    });
  },

  getBaseItem: (baseItemId?: BaseItemId) => {
    return baseItemId && baseItemId in get().list ? get().list[baseItemId] : undefined;
  },
});

export default create<BaseItemState>(devtools(store, 'BaseItemStore'));
