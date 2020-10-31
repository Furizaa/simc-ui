import create, { GetState, SetState } from 'zustand';
import { ulid } from 'ulid';
import { devtools } from 'zustand/middleware';
import produce from 'immer';
import { CharacterId, Simulation, SimulationConfigId, SimulationId } from '../../../types';

export type SimulationsState = {
  list: Record<SimulationId, Simulation>;
  createSimulation: (name: string, configurationId: SimulationConfigId) => SimulationId;
  getSimulation: (simulationId: SimulationId) => Simulation | undefined;

  addCharacterToSimulation: (simulationId: SimulationId, characterId: CharacterId) => void;
};

const store = (set: SetState<SimulationsState>, get: GetState<SimulationsState>) => ({
  list: {},

  createSimulation: (name: string, configurationId: SimulationConfigId) => {
    const id = ulid();
    set(state =>
      produce(state, draft => {
        draft.list[id] = { id, name, configurationId, characterIds: [] };
      }),
    );
    return id;
  },

  getSimulation: (simulationId?: SimulationId) => {
    return simulationId && simulationId in get().list ? get().list[simulationId] : undefined;
  },

  addCharacterToSimulation: (simulationId: SimulationId, characterId: CharacterId) => {
    return set(state =>
      produce(state, draft => {
        if (draft.list[simulationId] && !draft.list[simulationId].characterIds.includes(characterId)) {
          draft.list[simulationId].characterIds.push(characterId);
        }
      }),
    );
  },
});

export default create<SimulationsState>(devtools(store, 'SimulationStore'));
