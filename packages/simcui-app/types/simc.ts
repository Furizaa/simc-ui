/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable import/prefer-default-export */

export type Target = 'error_threshold' | 'iterations';

// target_error
export const TARGET_ERROR = {
  Auto: '0',
  '1 %': '1',
  '0.5 %': '0.5',
  '0.3 %': '0.3',
  '0.1 %': '0.1',
  '0.05 %': '0.05',
  '0.03 %': '0.03',
  '0.01 %': '0.01',
};
export type TargetError = keyof typeof TARGET_ERROR;

// iterations
export const ITERATIONS = {
  '100': 100,
  '1000': 1000,
  '10000': 10000,
  '25000': 25000,
  '50000': 50000,
  '100000': 100000,
  '250000': 250000,
  '500000': 500000,
};
export type Iterations = keyof typeof ITERATIONS;

// max_time
export const FIGHT_LENGTH = {
  100: '100 Seconds',
  150: '150 Seconds',
  200: '200 Seconds',
  250: '250 Seconds',
  300: '300 Seconds',
  350: '350 Seconds',
  400: '400 Seconds',
  450: '450 Seconds',
  500: '500 Seconds',
  600: '600 Seconds',
};
export type FightLength = keyof typeof FIGHT_LENGTH;

// vary_combat_length
export const FIGHT_LENGTH_VARIATION = {
  '0': 'None',
  '0.1': '10 %',
  '0.2': '20 %',
  '0.3': '30 %',
  '0.4': '40 %',
  '0.5': '50 %',
};
export type FightLengthVariation = keyof typeof FIGHT_LENGTH_VARIATION;

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

export const FIGHT_STYLE = {
  Patchwerk: 'Patchwerk (Tank-n-spank stationary target)',
  HecticAddCleave: 'Add Cleave (heavy movement with frequent add spawns)',
  HelterSkelter: 'HelterSkelter (movement, stuns, interrupts, target switching)',
  Ultraxion: 'Ultraxion (periodic stuns, raid damage)',
  LightMovement: 'Light Movement',
  HeavyMovement: 'Heavy Movement',
  Beastlord: 'Beastlord (random movement, advanced positioning, frequent add spawns)',
  CastingPatchwerk: 'Casting Patchwerk (stationary target, interrupts on cooldown)',
  DungeonSlice: 'Dungeon Slice (mythic+ trash and boss pulls)',
};
export type FightStyle = keyof typeof FIGHT_STYLE;

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
  fightLength: FightLength;
  fightLengthVariation: FightLengthVariation;
  challangeMode: ChallangeMode;
  pvpLevelDamageReduction: PVPLevelDamageReduction;
  targetRace: TargetRace;
  targetType: TargetType;
  tankDummy: TankDummy;
  tankDummyType: TankDummyType;
  tmiWindow: TMIWindow;
  worldLag: WorldLag;
}
