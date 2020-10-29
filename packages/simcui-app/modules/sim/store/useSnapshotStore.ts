import produce from 'immer';
import { ulid } from 'ulid';
import create, { GetState, SetState } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Snapshot, SnapshotId } from '../../../types';

export type SnapshotCreateParams = Pick<
  Snapshot,
  'name' | 'equipmentSetId' | 'simProcessId' | 'isFrozen' | 'talentSetId'
>;

export type SnapshotStore = {
  list: Record<SnapshotId, Snapshot>;

  createSnapshot: (params: SnapshotCreateParams) => SnapshotId;
  removeSnapshot: (snapshotId: SnapshotId) => void;
  freezeSnapshot: (snapshotId: SnapshotId) => void;
  getSnapshot: (snapshotId?: SnapshotId) => Snapshot | undefined;
};

const store = (set: SetState<SnapshotStore>, get: GetState<SnapshotStore>) => ({
  list: {},

  createSnapshot: (props: SnapshotCreateParams) => {
    const id = ulid();
    set((state) =>
      produce(state, (draft) => {
        draft.list[id] = { id, ...props, at: Date.now() };
      }),
    );
    return id;
  },

  removeSnapshot: (snapshotId: SnapshotId) => {
    set((state) =>
      produce(state, (draft) => {
        delete draft.list[snapshotId];
      }),
    );
  },

  freezeSnapshot: (snapshotId: SnapshotId) => {
    set((state) =>
      produce(state, (draft) => {
        if (state.list[snapshotId]) {
          draft.list[snapshotId].isFrozen = true;
        }
      }),
    );
  },

  getSnapshot: (snapshotId?: SnapshotId) => {
    return snapshotId && snapshotId in get().list ? get().list[snapshotId] : undefined;
  },
});

export default create<SnapshotStore>(devtools(store, 'SnapshotStore'));
