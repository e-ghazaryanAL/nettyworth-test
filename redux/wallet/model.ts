import { Asset } from '../top-sales/upshotmodel';

export interface IAssets {
  name: string;
  collectionTokenId: string;
  collectionName: string;
  imageUrl?: any;
  collectionAddress: string;
  chain: string;
  network: string;
  description: string;
  currentOwner: string;
  floor?: number;
  rarity?: number;
}

export interface INFTInfo {
  assets: IAssets[];
  owner: string;
  totalItems: number;
  totalPages: number;
  pageNumber: number;
}

export interface IWallet {
  address: string;
  ethBalance: number;
  ethUsdValue: number;
  nftCount: number;
  nftCollectionCount: number;
  nftUsdValue: number;
  totalUsdValue: number;
  ethUSD: number;
  ownedAssets: null | Asset[];
  totalProfit: number;
  totalCost: number;
  nettyWorth: number;
  NFTValue: number;
}

export interface ICollectionStats {
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
}

export interface IEthCurrency {
  ethbtc: string;
  ethbtc_timestamp: string;
  ethusd: string;
  ethusd_timestamp: string;
}

export interface AssetOwned {
  acquisition_network_id: string;
  acquisition_timestamp: string;
  acquisition_transaction_hash: string;
  asset_contract: string;
  cost_basis_eth: number;
  cost_basis_usd: number;
  floor_price_eth?: any;
  floor_price_usd?: any;
  item_id: string;
  item_type: string;
  network_id: string;
  original_estimated_price_eth?: any;
  original_estimated_price_usd?: any;
}

export interface INftInventory {
  address: string;
  asset_owned: AssetOwned[];
  total_cost_basis_eth: number;
  total_cost_basis_usd: number;
  total_estimated_price_eth: number;
  total_estimated_price_usd: number;
  total_floor_price_eth?: any;
  total_floor_price_usd?: any;
}

export type Trigger = 'navigation' | 'portfolioCTA';

export interface IUser {
  wallets: IWallet[];
  name?: string;
  email?: string;
  userImage: string;
  nettyWorth: number;
  NFTValue: number;
  collectionStats: null | ICollectionStats;
  nftInfo: null | INFTInfo;
  loading: boolean;
  NFTInventory: [] | INftInventory[];
  trigger: Trigger;
}

interface Floor {
  eth: string;
}

interface Floor2 {
  eth: string;
}

interface Source {
  floor: Floor2;
  processedAt: Date;
  source: string;
}

export interface IFloor {
  floor: Floor;
  processedAt: Date;
  sources: Source[];
}

export interface IFloorPrice {
  message: string;
  statusCode: string;
  data: IFloor;
}

export interface IValue {
  collectionAddress: string;
  message: string;
  statusCode: string;
  data: IFloorPrice;
}

export interface INftBankRes {
  collectionAddress: string;
  name: string;
  floor: {
    eth: string;
  };
  estimate: {
    eth: string;
  };
  processedAt: string;
}

export interface NftsOwned {
  collection_name: string;
  sub_collection_tag?: any;
  collection_address: string;
  symbol: string;
  type: string;
  token_id: string;
  amount_owned: string;
  appraised_price: number | null;
  liquidation_price: number | null;
  image_url?: string;
}

export interface IWalletTokens {
  total_items: number;
  nfts_valued: number;
  wallet_value: number;
  liquidation_value: number;
  nfts_owned: NftsOwned[];
}

export interface IWalletValueParams {
  wallet_address: string;
  historical?: boolean;
  include_hist_nfts?: boolean;
}

export interface IUserDetails {
  id: number;
  email: string;
  email_verified: boolean;
  pwd: string;
  refresh_token: string;
  phone: string;
  phone_verified: boolean;
  name: string;
  given_name: null | string;
  family_name: null | string;
  profile_picture: string;
  inactive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ISaveWallet {
  nettyWorth: number;
  address: string;
  cryptoValue: number;
  NFTValue: number;
}

export interface IUpshotStats {
  address: string;
  ens: any;
  gmi: number;
  gmi_rank: number;
  gmi_percentile: number;
  gmi_title: string;
  unrealized_gain: string;
  realized_gain: string;
  total_gain: string;
  unrealized_gain_percent: number;
  realized_gain_percent: number;
  total_gain_percent: number;
  volume: string;
  start_at: number;
  num_txs: number;
  num_assets_owned: number;
  num_blue_chips_owned: number;
  num_collections_owned: number;
  portfolio_value_wei: string;
}
