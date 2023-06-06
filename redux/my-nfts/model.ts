import { IAssets } from '../wallet/model';

export interface IParams {
  page: number;
}

export type WalletDetailOptions = {
  address: string;
  page: number;
};

export interface IMyNftsState {
  myNfts: {
    owner: string;
    assets: IAssets[];
    totalItems: number;
    totalPages: number;
    pageNumber: number;
  };
  loading: boolean;
}

export interface ICollection {
  collection_address: string;
  marketplaces: Marketplace[];
}

interface Marketplace {
  updated_at: string;
  floor_price: number;
  marketplace: string;
  collection_id: string;
  sub_collection_tag: string;
}
export interface INftFloorPrice {
  total_items: number;
  total_pages: number;
  page: number;
  collections: ICollection[];
}

export interface IRarityTokens {
  token_id: string;
  token_name: string;
  rarity_score: number;
  trait_rarity_score: any;
}

export interface ISummaryTokens {
  collection_percentile: string;
  currency_symbol: string;
  latest_collection_floor_price: number;
  latest_gross_median_spread_price: number;
  latest_sale: string;
  max_date: string;
  max_price: number;
  min_date: string;
  min_price: number;
  price: number;
  rolling_coll_median_price: number;
  rolling_coll_median_returns: number;
  rolling_collection_percentile_price: number;
  rolling_collection_percentile_returns: number;
  times_traded: number;
  token_id: string;
}

export interface IWalletNFTPnL {
  address: string;
  rept_curr: string;
  pnl: number;
  buy_volume: number;
  sell_volume: number;
  token_trades_closed: number;
  tokens_held_in_wallet: number;
  tokens_held_cost_basis: number;
  pnl_detail: PnlDetail[];
}

export interface PnlDetail {
  collection_address: string;
  collection_name: string;
  token_id: string;
  token_pnl: number;
  buy_volume: number;
  sell_volume: number;
  trades_closed: number;
  cost_basis_held: number;
  tokens_held: number;
  buy_sell_logs: string[];
}
