import { SerializedError } from '@reduxjs/toolkit';

import { Asset, TraitType } from './upshotmodel';

export interface IData {
  id: number;
  name: string;
  slug: string;
  owners: string;
  floor_price: string;
  total_supply: string;
  total_volume: string;
  one_day_volume: string;
  seven_day_volume: string;
  thirty_day_volume: string;
  one_day_change: string;
  seven_day_change: string;
  thirty_day_change: string;
  one_day_average_price: string;
  seven_day_average_price: string;
  thirty_day_average_price: string;
  one_day_sales: string;
  seven_day_sales: string;
  thirty_day_sales: string;
  total_sales: string;
  image: string;
  description: string;
  date_registration: Date;
  edit_date?: any;
  average_price: string;
  createdAt: Date;
  updatedAt: Date;
  analyst_rating: string;
  percentage_media: string;
  banner_image_url: string;
  twitter_username: string;
  instagram_username: string;
  telegram_url: string;
  discord_url: string;
  large_image_url: string;
}

export interface IAttributeValue {
  id: number;
  value: string;
  createdAt: string;
  updatedAt: string;
}
export interface ITokenAttribute {
  id: number;
  trait_type: string;
  rarity_score: number;
  createdAt: string;
  updatedAt: string;

  ethAttributeValues: IAttributeValue[];
}
export interface IToken {
  id: number;
  token_id: string;
  token_name: string;
  description: string;
  collection_uri: string;
  image_uri: string;
  rarity_score: number;
  createdAt: string;
  updatedAt: string;
  price: number;
  expires: number;
  on_auction: boolean;

  ethTokenAttributes: ITokenAttribute[];
}
export interface ICollection {
  id: number;
  collection_address: string;
  rank: number;
  collection_name: string;
  value: number;
  type: string;
  symbol: string;
  banner_image_url: string;
  created_date: string;
  description: string;
  name: string;
  slug: string;
  discord_url: string;
  telegram_url: string;
  twitter_username: string;
  instagram_username: string;
  marketplace: string;
  opensea_updated_at: string;
  one_hour_volume: number;
  one_hour_change: number;
  one_hour_sales: number;
  one_hour_sales_change: number;
  one_hour_average_price: number;
  one_hour_difference: number;
  six_hour_volume: number;
  six_hour_change: number;
  six_hour_sales: number;
  six_hour_sales_change: number;
  six_hour_average_price: number;
  six_hour_difference: number;
  one_day_volume: number;
  one_day_change: number;
  one_day_sales: number;
  one_day_sales_change: number;
  one_day_average_price: number;
  one_day_difference: number;
  seven_day_volume: number;
  seven_day_change: number;
  seven_day_sales: number;
  seven_day_average_price: number;
  seven_day_difference: number;
  thirty_day_volume: number;
  thirty_day_change: number;
  thirty_day_sales: number;
  thirty_day_average_price: number;
  thirty_day_difference: number;
  total_volume: number;
  total_sales: number;
  total_supply: number;
  count: number;
  num_owners: number;
  average_price: number;
  num_reports: number;
  market_cap: number;
  floor_price: number;
  tokens_count: number;
  createdAt: string;
  updatedAt: string;

  ethTokens: IToken[];
}
export interface IFetchCollectionsResult {
  total_items: number;
  total_pages: number;
  collections: ICollection[];
  favorites: number[];
}

export interface IFetchCollectionsResultPayload {
  getCollections: IFetchCollectionsResult;
}

interface ISearchParams {
  field: 'name';
  value: string;
}
export interface IFetchByPageParams {
  uuid: string;
  search?: ISearchParams;
  id?: number[];
  page?: number;
  items?: number;
  filter?: {
    field: 'id' | 'collection_address' | 'slug';
    value: string;
  };
}

export interface ICollectionAssets {
  count: number;
  assets: Asset[];
}

export type TopSalesState = {
  Collection: null | Collection;
  CollectionsAssets: null | ICollectionAssets;
  CollectionTraits: null | TraitType[];
  NftTopSalesDetailFilter: any;
  loading: boolean;
  detailNftsLoading: boolean;
  CollectionAssetLoading: boolean;
  CollectionTraitLoading: boolean;
  singleCollectionLoading: boolean;
  selectedDay: string;
  selectedDate: string;
  error: null | SerializedError;
  NftTopSalesCollections: ITopSalesData;
};

export type TopSalesDetailNftsParams = {
  page?: number;
  orderBy?: string;
  order?: 'ASC' | 'DESC';
  paginationSize?: number;
};

export interface Token {
  token_id: string;
  token_name: string;
  description: any;
  collection_uri: any;
  image_uri: string;
  attributes: Attribute[];
  rarity_score?: number;
}

interface Attribute {
  value: string;
  trait_type: string;
}

export interface ITokensByColl {
  total_items: number;
  total_pages: number;
  page: number;
  collection_address: string;
  collection_name: string;
  tokens: Token[];
}

export interface ITopSalesData {
  count: number;
  collections: Collection[];
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  contract_address: string;
  description?: string;
  image_url?: string;
  original_image_url?: string;
  banner_image_url?: string;
  external_link?: string;
  discord_url?: string;
  twitter_username?: string;
  is_appraised: boolean;
  royalties?: Royalties;
  verification_status: string;
  volume: Volume;
  num_sales: NumSales;
  average: Average;
  floor: Floor;
  market_cap: MarketCap;
  avg_appraisal: AvgAppraisal;
  percent_listed_near_floor?: number;
  num_listed?: number;
  num_owners: number;
  mape?: number;
  num_assets: number;
  avg_holder_gmi: number;
  avg_num_assets_owned_per_holder: number;
  smart_holder_percent: number;
  smart_flow: string;
}

interface Royalties {
  opensea: Opensea[];
  onchain?: Onchain[];
  artblocks?: Artblock[];
  eip2981?: Eip2981[];
}

interface Opensea {
  bps: number;
  recipient: string;
}

interface Onchain {
  bps: number;
  recipient: string;
}

interface Artblock {
  bps: number;
  recipient: string;
}

interface Eip2981 {
  bps: number;
  recipient: string;
}

interface Volume {
  wei_1d: string;
  wei_7d: string;
  wei_30d: string;
  wei_all_time: string;
  change: Change;
}

interface Change {
  wei_1d: number;
  wei_7d: number;
  wei_30d: number;
}

interface NumSales {
  num_1d: string;
  num_7d: string;
  num_30d: string;
  change: Change2;
}

interface Change2 {
  num_1d: number;
  num_7d: number;
  num_30d: number;
}

interface Average {
  wei_1d: string;
  wei_7d: string;
  wei_30d: string;
  change: Change3;
}

interface Change3 {
  wei_1d: number;
  wei_7d: number;
  wei_30d: number;
}

interface Floor {
  wei?: string;
  usd?: number;
  change: Change4;
}

interface Change4 {
  wei_1d?: number;
  wei_7d?: number;
  wei_30d?: number;
  usd_1d?: number;
  usd_7d?: number;
  usd_30d?: number;
}

interface MarketCap {
  wei: string;
  change: Change5;
}

interface Change5 {
  wei_1d: number;
  wei_7d: number;
  wei_30d: number;
}

interface AvgAppraisal {
  wei?: string;
  change: Change6;
}

interface Change6 {
  wei_1d?: number;
  wei_7d?: number;
  wei_30d?: number;
}

export interface ITopSalesDataParams {
  limit?: number;
  offset?: number;
  search_term?: string;
  collection_id_or_slugs?: string[];
  tag_ids?: string[];
  sort_order?: string;
  sort_direction?: 'ASC' | 'DESC';
  include_count?: boolean;
  slug?: string;
}

export interface CollectionsAssetsParams extends ITopSalesDataParams {
  min_ask?: string;
  max_ask?: string;
  trait_ids?: string[];
  trait_filter_join?: 'AND' | 'OR';
}
