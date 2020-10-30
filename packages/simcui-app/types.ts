import * as Simc from './types/simc';
import * as WOW from './types/wow';

export * as Simc from './types/simc';
export * as WOW from './types/wow';

export type AsyncError = { code: number; text: string } | null;

export type AsyncStore<T> = {
  status: 'idle' | 'queue' | 'loading' | 'done';
  data: T | null;
  error: AsyncError;
};

export interface NativeEventReturnValue<T> {
  data: T | null;
  error: string | null;
}

export type NativeRunEventData = { stage: 'running'; percentage: number } | { stage: 'done'; output: string };

export type SimProcessStatus =
  | { type: 'idle' }
  | { type: 'staged' }
  | { type: 'running'; percentage: number }
  | { type: 'error'; errorText: string }
  | { type: 'cancelled' }
  | { type: 'done'; result: Record<string, any> }
  | { type: 'dirty'; result: Record<string, any> };

export type SimProcessId = string;
export type SimProcess = {
  createdAt: number;
  status: SimProcessStatus;
};

export type SimulationConfigId = string;
export type SimulationConfig = {
  id: SimulationConfigId;
  name: string;
  description: string;
  opts: Simc.Config;
};

export type SimulationId = string;
export type Simulation = {
  id: SimulationId;
  name: string;
  configurationId: SimulationConfigId;
};

export type CharacterId = string;
export type Character = {
  id: CharacterId;
  wowId: number;
  name: string;
  classWowId: WOW.CharacterClassId;
  level: number;
  equippedItemLevel: number;
  backgroundRenderUrl?: string;
  race: WOW.LocalizedString;
};

export type ItemInstance = {
  id: string;
  baseItemId: number;
  slot: WOW.Slot;
  dropLvl: number;
  dropQuality: WOW.Quality;
  bonusIds: number[];
};

export type BaseItemId = WOW.ItemResponse['id'];
export type BaseItem = WOW.ItemResponse & { icon?: string };

export type EquipmentSetId = string;
export type EquipmentSet<T = ItemInstance['id'] | undefined> = Record<WOW.Slot, T>;

export type SnapshotId = string;
export type Snapshot = {
  id: SnapshotId;
  name: string;
  isFrozen: boolean;
  at: number;
  equipmentSetId: EquipmentSetId;
  simProcessId: SimProcessId;
  talentSetId: TalentSetId;
};

export type Spec = {
  name: WOW.LocalizedString;
  id: number;
};

export type TalentSetId = string;
export type TalentSet = {
  specId: number;
  activeTalents: number[];
};

export type Spell = {
  name: WOW.LocalizedString;
  description: WOW.LocalizedString;
  id: number;
  icon?: string;
};

export type EnchantId = number;
export type Enchant = {
  name: WOW.LocalizedString;
  id: EnchantId;
  sourceItemId?: WOW.ItemResponse['id'];
};

export type EnchantSet = Record<WOW.Slot, ItemInstance['id'] | undefined>;
