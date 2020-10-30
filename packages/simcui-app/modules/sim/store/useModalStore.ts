import create, { SetState } from 'zustand';
import { devtools } from 'zustand/middleware';

export enum SimModalType {
  SIM_IMPORT_CHARACTER,
  SIM_CREATE_CONFIGURATION,
}

export type SimModalState = {
  currentOpenModal: SimModalType | null;
  open: (simModalType: SimModalType) => void;
  closeAll: () => void;
};

const store = (set: SetState<SimModalState>) => ({
  currentOpenModal: null,

  open: (simModalType: SimModalType) => set(() => ({ currentOpenModal: simModalType })),

  closeAll: () => set(() => ({ currentOpenModal: null })),
});

export default create<SimModalState>(devtools(store, 'useModalStore'));
