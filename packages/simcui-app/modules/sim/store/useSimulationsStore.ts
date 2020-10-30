import create, { GetState, SetState } from 'zustand';
import { ulid } from 'ulid';
import { devtools } from 'zustand/middleware';
import produce from 'immer';
import { CharacterId, Simulation, SimulationConfigId, SimulationId } from '../../../types';

export type SimulationsState = {
  list: Record<SimulationId, Simulation>;
  selectedSimulationId: SimulationId | undefined;
  createSimulation: (name: string, configurationId: SimulationConfigId) => void;
  selectSimulation: (simulationId: SimulationId) => void;
  getSimulation: (simulationId: SimulationId) => Simulation | undefined;

  // Simulation -> Character Intersection

  charactersInSimulation: Record<SimulationId, CharacterId[]>;
  addCharacterToSimulation: (simulationId: SimulationId, characterId: CharacterId) => void;
  getCharacterIdsInSelectedSimulation: () => CharacterId[];
};

const store = (set: SetState<SimulationsState>, get: GetState<SimulationsState>) => ({
  list: {},

  selectedSimulationId: undefined,

  createSimulation: (name: string, configurationId: SimulationConfigId) => {
    const id = ulid();
    return set((state) =>
      produce(state, (draft) => {
        draft.list[id] = { id, name, configurationId };
        draft.selectedSimulationId = id;
        draft.charactersInSimulation[id] = [];
      }),
    );
  },

  selectSimulation: (simulationId: SimulationId) =>
    set((state) => {
      if (simulationId in state.list) {
        return {
          selectedSimulationId: simulationId,
        };
      }
      return {};
    }),

  getSimulation: (simulationId?: SimulationId) => {
    return simulationId && simulationId in get().list ? get().list[simulationId] : undefined;
  },

  // Simulation -> Character Intersection

  charactersInSimulation: {},

  addCharacterToSimulation: (simulationId: SimulationId, characterId: CharacterId) => {
    return set((state) =>
      produce(state, (draft) => {
        draft.charactersInSimulation[simulationId]?.push(characterId);
      }),
    );
  },

  getCharacterIdsInSelectedSimulation: () => {
    const selectedSim = get().selectedSimulationId;
    return selectedSim && selectedSim in get().charactersInSimulation ? get().charactersInSimulation[selectedSim] : [];
  },
});

export default create<SimulationsState>(devtools(store, 'SimulationStore'));
