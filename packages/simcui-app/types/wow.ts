export type Region = 'eu' | 'us';

export type Locale = 'en_US' | 'es_MX' | 'pt_BR' | 'de_DE' | 'en_GB' | 'es_ES' | 'fr_FR' | 'it_IT' | 'ru_RU';

export type Link = {
  href: string;
};

export type Reference<T = number> = {
  key: Link;
  id: T;
};

export type NamedReference<T = number> = Reference<T> & {
  name: LocalizedString;
};

export type SelfReference = {
  self: Link;
};

export type RealmReference = NamedReference & { slug: string };

export type CharacterReference = NamedReference & { realm: RealmReference };

export type KeyedValue<T> = { key: string; value: T };

export type UnionValue<T> = {
  type: T;
  name: LocalizedString;
};

export type NumberValue = {
  value: number;
  display_string: LocalizedString;
};

export type LocalizedString = Record<Locale, string>;

export type RGBA = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export type CharacterClassId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Slot =
  | 'HEAD'
  | 'NECK'
  | 'SHOULDER'
  | 'CHEST'
  | 'WAIST'
  | 'LEGS'
  | 'FEET'
  | 'WRIST'
  | 'HANDS'
  | 'FINGER_1'
  | 'FINGER_2'
  | 'TRINKET_1'
  | 'TRINKET_2'
  | 'BACK'
  | 'MAIN_HAND'
  | 'OFF_HAND'
  | 'TABARD'
  | 'SHIRT';

export type Quality = 'HEIRLOOM' | 'ARTIFACT' | 'LEGENDARY' | 'EPIC' | 'RARE' | 'UNCOMMON' | 'COMMON' | 'POOR';

export type Stat = 'AGILITY' | 'INTELLECT' | 'STAMINA' | 'MASTERY_RATING' | 'HASTE_RATING' | 'CRIT_RATING'; // ? EXHAUSTIVE ?

export type Binding = 'ON_ACQUIRE' | 'ON_EQUIP'; // ? EXHAUSTIVE ?

export type CurrencyValue = {
  gold: LocalizedString;
  silver: LocalizedString;
  copper: LocalizedString;
};

export type PreviewSocket = {
  socket_type: UnionValue<'PRISMATIC'>;
  item?: NamedReference;
  display_string?: LocalizedString;
  media?: Reference;
};

export type PreviewEnchantment = {
  display_string: LocalizedString;
  source_item?: NamedReference;
  enchantment_id: number;
};

export type PreviewStat = {
  type: UnionValue<Stat>;
  value: number;
  is_equip_bonus?: boolean;
  display: {
    display_string: LocalizedString;
    color: RGBA;
  };
};

export type PreviewItem = {
  item: Reference;
  slot: UnionValue<Slot>;
  sockets?: PreviewSocket[];
  enchantments?: PreviewEnchantment[];
  quantity: number;
  context: number;
  bonus_list: number[];
  timewalker_level?: number;
  quality: UnionValue<Quality>;
  name: LocalizedString;
  media: Reference;
  item_class: NamedReference;
  item_subclass: NamedReference;
  inventory_type: UnionValue<Slot>;
  binding: UnionValue<Binding>;
  unique_equipped?: LocalizedString;
  limit_category?: LocalizedString;
  armor?: {
    value: number;
    display: {
      display_string: LocalizedString;
      color: RGBA;
    };
  };
  stats: PreviewStat[];
  description?: LocalizedString;
  sell_price?: {
    value: number;
    display_strings: {
      header: LocalizedString;
    } & CurrencyValue;
  };
  legacy?: LocalizedString;
  requirements: {
    level: NumberValue;
  };
  level: NumberValue;
  is_subclass_hidden?: boolean;
  durability: NumberValue;
};

// ----------------
// API Responses
// ----------------

export type CharacterRequestBody = {
  region: Region;
  realm: string;
  name: string;
};

export type CharacterRequestResult = {
  character: CharacterResponse;
  equipment: EquipmentResponse;
  media: CharacterMediaResponse;
  spec: CharacterSpecsResponse;
};

export type QueuedResult<T> =
  | {
      token: string;
      waitTimeSeconds: number;
    }
  | {
      cache: Result<T>;
    };

export type QueuedLookupResult<T> = {
  token: string;
  status: 'QUEUE' | 'DONE';
  payload: T;
};

export type Result<T> = {
  data: null | T;
  error: null | { code: number; text: string };
};

export type EquipmentResponse = {
  _links: SelfReference;
  character: CharacterReference;
  equipped_items: PreviewItem[];
};

export type CharacterMediaResponse = {
  _links: SelfReference;
  character: CharacterReference;
  avatar_url?: string;
  bust_url?: string;
  render_url?: string;
  assets?: KeyedValue<string>[];
};

export type CharacterResponse = {
  _links: SelfReference;
  id: number;
  name: string;
  gender: UnionValue<'MALE' | 'FEMALE'>;
  faction: UnionValue<'HORDE' | 'ALLIANCE'>;
  race: NamedReference;
  character_class: NamedReference<CharacterClassId>;
  active_spec: NamedReference;
  realm: RealmReference;
  guild: CharacterReference;
  level: number;
  experience: number;
  achievement_points: number;
  achievements: Link;
  titles: Link;
  pvp_summary: Link;
  raid_progression: Link;
  media: Link;
  last_login_timestamp: number;
  average_item_level: number;
  equipped_item_level: number;
  specializations: Link;
  statistics: Link;
  mythic_keystone_profile: Link;
  equipment: Link;
  appearance: Link;
  collections: Link;
};

export type ItemResponse = {
  _links: SelfReference;
  id: number;
  quality: UnionValue<Quality>;
  name: LocalizedString;
  level: number;
  spells?: Array<{
    // Caition: These spells are not found in the spell api!
    spell: NamedReference;
    description: LocalizedString;
  }>;
  required_level: number;
  media: Reference;
  item_class: NamedReference;
  item_subclass: NamedReference;
  inventory_type: UnionValue<Slot>;
  purchase_price: number;
  purchase_quantity: number;
  sell_price: number;
  max_count: number;
  is_equippable: boolean;
  is_stackable: boolean;
  description?: LocalizedString;
  preview_item: Omit<PreviewItem, 'enchantments'>;
};

export type ItemMediaResponse = {
  _links: SelfReference;
  id: number;
  assets: Array<{
    key: 'icon';
    value: string;
    file_data_id: number;
  }>;
};

export type CharacterSpecsResponse = {
  _links: SelfReference;
  specializations: Array<{
    specialization: NamedReference;
    talents: Array<{
      talent: NamedReference;
      spell_tooltip: {
        spell: NamedReference;
        description: LocalizedString;
        cast_time: LocalizedString;
        power_cost: LocalizedString;
        range: LocalizedString;
      };
      tier_index: number;
      column_index: number;
    }>;
    glyphs: any; // TODO
    pvp_talent_slots: any; // UGH
  }>;
};

export type ItemRequestResult = {
  item: ItemResponse;
  media: ItemMediaResponse;
};

export type SpellMediaResponse = {
  _links: SelfReference;
  id: number;
  assets: Array<{
    key: 'icon';
    value: string;
    file_data_id: number;
  }>;
};

export type SpellResponse = {
  _links: SelfReference;
  id: number;
  name: LocalizedString;
  description: LocalizedString;
  media: Reference;
};

export type SpellRequestResult = {
  spell: SpellResponse;
  media: SpellMediaResponse;
};

// DB Files

export type DBRealmList = Record<Region, RealmReference>;

export type DBCharacterClass = Record<CharacterClassId, { id: CharacterClassId; name: LocalizedString }>;

export type DBSpec = Record<string, { name: LocalizedString; id: number }>;
