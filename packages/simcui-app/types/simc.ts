/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable import/prefer-default-export */

// target_error
export enum TargetError {
  Auto = '0',
  $1 = '1',
  $05 = '0.5',
  $03 = '0.3',
  $01 = '0.1',
  $005 = '0.05',
  $003 = '0.03',
  $001 = '0.01',
}

// iterations
export enum Iterations {
  $100 = 100,
  $1000 = 1000,
  $10000 = 10000,
  $25000 = 25000,
  $50000 = 50000,
  $100000 = 100000,
  $250000 = 250000,
  $500000 = 500000,
}

// max_time
export enum Length {
  $100 = 100,
  $150 = 150,
  $200 = 200,
  $250 = 250,
  $300 = 300,
  $350 = 350,
  $400 = 400,
  $450 = 450,
  $500 = 500,
  $600 = 600,
}

// vary_combat_length
export enum LengthVariation {
  $0 = '0',
  $10 = '0.1',
  $20 = '0.2',
  $30 = '0.3',
  $40 = '0.4',
  $50 = '0.5',
}

export type EnemyCount = number;

// target_level
export enum TargetLevel {
  RaidBoss = 3,
  DungeonHeroic = 2,
  DungeonNormal = 1,
  PlayerMaxLevel = 0,
}

// vary_combat_length
export type PVPLevelDamageReduction = boolean;

// challenge_mode
export type ChallangeMode = boolean;

// target_race
export enum TargetRace {
  Humanoid,
  Beast,
  Demon,
  Dragonkin,
  Elemental,
  Giant,
  Undead,
}

export enum TargetType {
  Custom = 'custom',
  FluffyPillow = 'fluffy_pillow',
  TankDummy = 'tank_dummy',
}

// tank_dummy
export enum TankDummy {
  None = 'Tank_Dummy_None',
  Weak = 'Tank_Dummy_Weak',
  Dungeon = 'Tank_Dummy_Dungeon',
  Raid = 'Tank_Dummy_Raid',
  Mythic = 'Tank_Dummy_Mythic',
}

// tank_dummy_type
export enum TankDummyType {
  None = 'None',
  Weak = 'Weak',
  Dungeon = 'Dungeon',
  Raid = 'Raid',
  Mythic = 'Mythic',
}

export enum FightStyle {
  Patchwerk = 'Patchwerk',
  HecticAddCleave = 'HecticAddCleave',
  HelterSkelter = 'HelterSkelter',
  Ultraxion = 'Ultraxion',
  LightMovement = 'LightMovement',
  HeavyMovement = 'HeavyMovement',
  Beastlord = 'Beastlord',
  CastingPatchwerk = 'CastingPatchwerk',
  DungeonSlice = 'DungeonSlice',
}

// tmi_window_global
export enum TMIWindow {
  $0 = 0,
  $2 = 2,
  $3 = 3,
  $4 = 4,
  $5 = 5,
  $6 = 6,
  $7 = 7,
  $8 = 8,
  $9 = 9,
  $10 = 10,
}

// default_world_lag
export enum WorldLag {
  $25 = '0.025',
  $50 = '0.050',
  $100 = '0.1',
  $150 = '0.15',
  $200 = '0.2',
}

export interface Config {
  targetError: TargetError;
  iterations: Iterations;
  fightStyle: FightStyle;
  fightLength: Length;
  fightLengthVariation: LengthVariation;
  challangeMode: ChallangeMode;
  pvpLevelDamageReduction: PVPLevelDamageReduction;
  targetRace: TargetRace;
  targetType: TargetType;
  tankDummy: TankDummy;
  tankDummyType: TankDummyType;
  tmiWindow: TMIWindow;
  worldLag: WorldLag;
}
