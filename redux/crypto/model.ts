export interface IPlatform {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  token_address: string;
}

export interface Status {
  timestamp: Date;
  error_code: number;
  error_message?: unknown;
  elapsed: number;
  credit_count: number;
  notice?: unknown;
  total_count: number;
}

export interface IUSD {
  [key: string]: unknown;
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  tvl?: unknown;
  last_updated: Date;
}

interface Tag {
  slug: string;
  name: string;
  category: string;
}

export interface IQuote {
  [key: string]: IUSD;
  USD: IUSD;
}

export interface IData {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: Date;
  tags: string[] | Tag[];
  max_supply?: number;
  circulating_supply: number;
  total_supply: number;
  platform: IPlatform;
  cmc_rank: number;
  self_reported_circulating_supply?: any;
  self_reported_market_cap?: any;
  tvl_ratio?: any;
  last_updated: Date;
  quote: IQuote;
  favorite?: boolean;
}

export interface Datum {
  id: number;
  name: string;
  sign: string;
  symbol: string;
}

export interface ICryptoFilters {
  status: Status | null;
  data: Datum[];
}

export interface ICryptoCurr {
  status: Status | null;
  data: IData[];
  favourites: any;
}

interface IDetailData extends IData {
  is_active: number;
  is_fiat: number;
  tag: Tag[];
}
interface DetailData {
  [key: string]: IDetailData;
}
interface ICryptoDetails {
  status: Status | null;
  data: DetailData | null;
}

interface Urls {
  website: string[];
  twitter: string[];
  message_board: string[];
  chat: string[];
  facebook: any[];
  explorer: string[];
  reddit: string[];
  technical_doc: string[];
  source_code: string[];
  announcement: string[];
}

interface Coin {
  id: number;
  name: string;
  symbol: string;
  slug: string;
}

interface Platform {
  name: string;
  coin: Coin;
}

interface ContractAddress {
  contract_address: string;
  platform: Platform;
}

interface ETH {
  id: number;
  name: string;
  symbol: string;
  category: string;
  description: string;
  slug: string;
  logo: string;
  subreddit: string;
  notice: string;
  tags: string[];
  'tag-names': string[];
  'tag-groups': string[];
  urls: Urls;
  platform?: any;
  date_added: Date;
  twitter_username: string;
  is_hidden: number;
  date_launched?: any;
  contract_address: ContractAddress[];
  self_reported_circulating_supply?: unknown;
  self_reported_tags?: unknown;
  self_reported_market_cap?: unknown;
}

interface ICryptoMap extends Coin {
  is_active: number;
  first_historical_data: Date;
  last_historical_data: Date;
  platform: Platform;
}
interface ICryptoMetaData {
  [key: string]: ETH;
}

export interface ICryptoQuote {
  [key: string]: ISymbol[];
}

export interface ISymbol {
  quotes: Quote[];
  id: number;
  name: string;
  symbol: string;
  is_active: number;
  is_fiat: number;
}

export interface Quote {
  timestamp: string;
  quote: Quote2;
}

export interface Quote2 {
  USD: Usd;
}

export interface Usd {
  price: number;
  volume_24h: number;
  market_cap: number;
  total_supply: number;
  circulating_supply: number;
  timestamp: string;
}

export interface ICryptoData {
  cryptoData: ICryptoCurr;
  cryptoDetails: ICryptoDetails;
  currencyData: ICryptoFilters;
  cryptoMetadata: null | ICryptoMetaData;
  cryptoStats: null | ICryptoQuote;
  cryptoMap: null | ICryptoMap[];
  loading: boolean;
  filtersLoading: boolean;
  detailsLoading: boolean;
  statsLoading: boolean;
}

export type CryptoCurrencyParams = {
  start: number;
  limit: number;
  convert?: string;
  slug?: string;
};

export type StatsInterval = '24h' | '7d' | '30d' | '90d' | '365d';
export interface CryptoCurrencyStatParams {
  id?: string;
  symbol: string;
  interval: StatsInterval;
}
