import create, { GetState, SetState } from 'zustand';
import { ulid } from 'ulid';
import { devtools } from 'zustand/middleware';
import produce from 'immer';
import { CharacterId, SimulationConfigId, SimulationParameters, SimulationParametersId } from '../../../types';

export type SimulationsState = {
  list: Record<SimulationParametersId, SimulationParameters>;
  selectedSimulationId: SimulationParametersId | undefined;
  createSimulation: (executableGUID: string, configurationId: SimulationConfigId) => void;
  selectSimulation: (simulationId: SimulationParametersId) => void;
  getSimulation: (simulationId: SimulationParametersId) => SimulationParameters | undefined;

  // Simulation -> Character Intersection

  charactersInSimulation: Record<SimulationParametersId, CharacterId[]>;
  addCharacterToSimulation: (simulationId: SimulationParametersId, characterId: CharacterId) => void;
  getCharacterIdsInSelectedSimulation: () => CharacterId[];
};

const store = (set: SetState<SimulationsState>, get: GetState<SimulationsState>) => ({
  list: {},

  selectedSimulationId: undefined,

  createSimulation: (executableGUID: string, configurationId: SimulationConfigId) => {
    const id = ulid();
    return set((state) =>
      produce(state, (draft) => {
        draft.list[id] = { id, executableGUID, configurationId };
        draft.selectedSimulationId = id;
        draft.charactersInSimulation[id] = [];
      }),
    );
  },

  selectSimulation: (simulationId: SimulationParametersId) =>
    set((state) => {
      if (simulationId in state.list) {
        return {
          selectedSimulationId: simulationId,
        };
      }
      return {};
    }),

  getSimulation: (simulationId?: SimulationParametersId) => {
    return simulationId && simulationId in get().list ? get().list[simulationId] : undefined;
  },

  // Simulation -> Character Intersection

  charactersInSimulation: {},

  addCharacterToSimulation: (simulationId: SimulationParametersId, characterId: CharacterId) => {
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
