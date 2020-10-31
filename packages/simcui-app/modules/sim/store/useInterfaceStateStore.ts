import produce from 'immer';
import { CharacterId, SimulationId } from 'types';
import create, { GetState, SetState } from 'zustand';
import { devtools } from 'zustand/middleware';

export type InterfaceStateStore = {
  selectedSimulationId: SimulationId | undefined;
  getSelectedSimulationId: () => SimulationId | undefined;
  setSelectedSimulationId: (simulationId: SimulationId) => void;

  selectedCharacterId: Record<SimulationId, CharacterId | undefined>;
  getSelectedCharacterId: (simulationId: SimulationId) => CharacterId | undefined;
  setSelectedCharacterId: (simulationId: SimulationId, characterId: CharacterId | undefined) => void;
};

const store = (set: SetState<InterfaceStateStore>, get: GetState<InterfaceStateStore>) => ({
  selectedSimulationId: undefined,

  getSelectedSimulationId: () => get().selectedSimulationId,

  setSelectedSimulationId: (simulationId: SimulationId) => set({ selectedSimulationId: simulationId }),

  selectedCharacterId: {},

  getSelectedCharacterId: (simulationId: SimulationId) => get().selectedCharacterId[simulationId] ?? undefined,
  setSelectedCharacterId: (simulationId: SimulationId, characterId: CharacterId | undefined) =>
    set(state =>
      produce(state, draft => {
        draft.selectedCharacterId[simulationId] = characterId;
      }),
    ),
});

export default create<InterfaceStateStore>(devtools(store, 'InterfaceStateStore'));
