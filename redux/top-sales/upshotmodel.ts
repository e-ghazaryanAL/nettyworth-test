export interface Asset<T = Trait[]> {
  id: string;
  token_id: string;
  address: string;
  original_media_url: string;
  large_media_url: any;
  poster_media_url: any;
  thumbnail_media_url: any;
  video_preview_url: any;
  is_flagged: boolean;
  name: string;
  traits: T;
  collection: Collection;
  rarity_score: number;
  rarity_rank: number;
  owner: string;
  ask_appraisal_relative_delta?: number;
  last_sale_appraisal_relative_delta?: number;
  mape: number;
  last_sale?: LastSale;
  ask?: Ask;
  appraisal: Appraisal;
}

export interface Trait {
  type: string;
  value: string;
}

export interface Collection {
  id: string;
  name: string;
  image_url: string;
}

export interface LastSale {
  asset_id: string;
  timestamp: number;
  collection_id: string;
  wei: string;
  usd: number;
  market_name: string;
  currency_id: string;
  quantity: number;
  log_index: number;
  tx_hash: string;
  to_address: string;
  from_address: string;
  type: string;
}

export interface Ask {
  wei: string;
  usd: number;
  currency_id: string;
  market_name: string;
  url: string;
  timestamp: number;
  expiration_at: number;
  from_address: string;
  cancellation: boolean;
}

export interface Appraisal {
  wei: string;
  timestamp: number;
  mape: number;
  change: Change;
}

export interface Change {
  wei_1d: number;
  wei_7d: number;
  wei_30d: number;
}

export interface CollectionTraitTypes {
  trait_types: TraitType[];
}

export interface TraitType {
  type: string;
  count: number;
}

interface Change2 {
  wei_1d: number;
  wei_7d: number;
  wei_30d: number;
}
interface Floor {
  wei: string;
  usd: number;
  change: Change;
}

interface AvgAppraisal {
  wei: string;
  change: Change2;
}

interface Volume extends Change2 {
  wei_all_time: string;
  change: Change2;
}

export interface ITraitMetadata {
  id: string;
  type: string;
  display_type: string;
  value: string;
  count: number;
  is_meta: boolean;
  is_null: boolean;
  image_url: string;
  rarity: number;
  timestamp: string;
  floor: Floor;
  last_sale: LastSale;
  avg_appraisal: AvgAppraisal;
  volume: Volume;
  floor_avg_appraisal_relative_delta: number;
}
