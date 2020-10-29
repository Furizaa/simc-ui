import produce from 'immer';
import qs from 'querystring';
import create, { GetState, SetState } from 'zustand';
import { devtools } from 'zustand/middleware';
import manifest from '@cloud/gatewayManifest.json';
import { AsyncStore, BaseItem, BaseItemId, WOW } from '../../../types';

export type BaseItemState = {
  list: Record<BaseItemId, AsyncStore<BaseItem>>;

  addBaseItem: (baseItemId: BaseItemId) => Promise<BaseItem | null>;
  getBaseItem: (baseItemId?: BaseItemId) => AsyncStore<BaseItem> | undefined;
};

const store = (set: SetState<BaseItemState>, get: GetState<BaseItemState>) => ({
  list: {},

  addBaseItem: async (baseItemId: number): Promise<BaseItem | null> => {
    set((state) =>
      produce(state, (draft) => {
        draft.list[baseItemId] = { status: 'loading', data: null, error: null };
      }),
    );

    const query = {
      // We don't care from which region items are loaded UwU
      region: 'eu',
      'item-id': baseItemId,
    };

    const result = await fetch(`${manifest.bnetGatewayEndpoint}item?${qs.stringify(query)}`);
    const json = (await result.json()) as WOW.Result<WOW.ItemRequestResult>;

    if (json.error) {
      set((state) =>
        produce(state, (draft) => {
          draft.list[baseItemId] = { status: 'done', data: null, error: json.error };
        }),
      );
      return null;
    }

    if (json.data) {
      const icon = json.data.media.assets.find((asset) => asset.key === 'icon')?.value ?? undefined;
      const baseItem = { ...json.data.item, icon };
      set((state) =>
        produce(state, (draft) => {
          draft.list[baseItemId] = { status: 'done', data: baseItem, error: null };
        }),
      );
      return baseItem;
    }

    // Unknown Response
    set((state) =>
      produce(state, (draft) => {
        draft.list[baseItemId] = { status: 'done', data: null, error: { code: 500, text: 'Unknown response.' } };
      }),
    );
    return null;
  },

  getBaseItem: (baseItemId?: BaseItemId) => {
    return baseItemId && baseItemId in get().list ? get().list[baseItemId] : undefined;
  },
});

export default create<BaseItemState>(devtools(store, 'BaseItemStore'));
