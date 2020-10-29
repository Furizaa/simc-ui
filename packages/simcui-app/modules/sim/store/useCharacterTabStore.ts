import create, { SetState } from 'zustand';
import { devtools } from 'zustand/middleware';

export const CHARACTER_TAB_INDEX = {
  EQUIPMENT: 0,
  SKILLS: 1,
  SOULBINDS: 2,
  TCI: 3,
  RESULTS: 4,
};

export type CharacterTabs = {
  tabIndex: number;

  setTabIndex: (index: number) => void;
};

const store = (set: SetState<CharacterTabs>) => ({
  tabIndex: 0,

  setTabIndex: (index: number) => {
    set(() => ({ tabIndex: index }));
  },
});

export default create<CharacterTabs>(devtools(store, 'CharacterTabs'));
