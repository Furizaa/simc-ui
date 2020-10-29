import produce from 'immer';
import { ulid } from 'ulid';
import create, { GetState, SetState } from 'zustand';
import { devtools } from 'zustand/middleware';
import { SimProcess, SimProcessId, SimProcessStatus } from '../../../types';

export type SimProcessStore = {
  list: Record<SimProcessId, SimProcess>;

  createProcess: () => SimProcessId;
  removeProcess: (procId: SimProcessId) => void;
  duplicateProcess: (procId: SimProcessId) => SimProcessId;
  getProcess: (procId?: SimProcessId) => SimProcess | undefined;

  setProcessStatus: (procId: SimProcessId, status: SimProcessStatus) => void;
};

const store = (set: SetState<SimProcessStore>, get: GetState<SimProcessStore>) => ({
  list: {},

  createProcess: () => {
    const procId = ulid();
    set((state) =>
      produce(state, (draft) => {
        draft.list[procId] = { createdAt: Date.now(), status: { type: 'idle' } };
      }),
    );
    return procId;
  },

  removeProcess: (procId: SimProcessId) =>
    set((state) =>
      produce(state, (draft) => {
        if (!draft.list[procId] || draft.list[procId].status.type !== 'running') {
          delete draft.list[procId];
        }
      }),
    ),

  duplicateProcess: (procId: SimProcessId) => {
    const id = ulid();
    const source = get().list[procId];
    set((state) =>
      produce(state, (draft) => {
        if (source) {
          draft.list[id] = { ...source };
          draft.list[id].createdAt = Date.now();
          if (source.status.type === 'done') {
            draft.list[id].status = { type: 'dirty', result: source.status.result };
          }
        } else {
          draft.list[id] = { createdAt: Date.now(), status: { type: 'idle' } };
        }
      }),
    );
    return id;
  },

  getProcess: (procId?: SimProcessId) => {
    return procId && procId in get().list ? get().list[procId] : undefined;
  },

  setProcessStatus: (procId: SimProcessId, status: SimProcessStatus) =>
    set((state) =>
      produce(state, (draft) => {
        if (draft.list[procId]) {
          draft.list[procId].status = status;
        }
      }),
    ),
});

export default create<SimProcessStore>(devtools(store, 'SimProcessStore'));
