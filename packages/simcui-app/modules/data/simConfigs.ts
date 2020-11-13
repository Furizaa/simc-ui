import { SimulationConfig } from '../../types';
import * as Simc from '../../types/simc';

const simConfigs: SimulationConfig[] = [
  {
    id: '01EMH72R909F6Q5MCYNGKX5YRA',
    name: 'Patchwerk',
    description: "Preselected sane defaults for a Tank'n'Spank style fight in an raid environment.",
    opts: {
      targetError: 'Auto',
      iterations: '100000',
      fightStyle: 'Patchwerk',
      challangeMode: false,
      pvpLevelDamageReduction: false,
      fightLength: 300,
      fightLengthVariation: '0.2',
      tankDummy: Simc.TankDummy.Raid,
      tankDummyType: Simc.TankDummyType.Raid,
      targetRace: Simc.TargetRace.Humanoid,
      targetType: Simc.TargetType.FluffyPillow,
      tmiWindow: Simc.TMIWindow.$6,
      worldLag: Simc.WorldLag.$100,
    },
  },
  {
    id: '01ENTM9MKCNHZ0GX3ZCYATQPJY',
    name: 'Dungeon Slice',
    description: 'Preselected sane defaults for a max level dungeon.',
    opts: {
      targetError: 'Auto',
      iterations: '100000',
      fightStyle: 'DungeonSlice',
      challangeMode: false,
      pvpLevelDamageReduction: false,
      fightLength: 300,
      fightLengthVariation: '0.2',
      tankDummy: Simc.TankDummy.Raid,
      tankDummyType: Simc.TankDummyType.Raid,
      targetRace: Simc.TargetRace.Humanoid,
      targetType: Simc.TargetType.FluffyPillow,
      tmiWindow: Simc.TMIWindow.$6,
      worldLag: Simc.WorldLag.$100,
    },
  },
];

export default simConfigs;
