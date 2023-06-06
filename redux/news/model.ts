import { Moment } from 'moment';

export interface INettyNews {
  id: number;
  date: string;
  date_gmt: string;
  guid: Guid;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: Title;
  content: Content;
  excerpt: Excerpt;
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: any[];
  categories: number[];
  tags: any[];
  yoast_head: string;
  yoast_head_json: YoastHeadJson;
  featured_image_src: string;
  featured_image_src_square: string;
  author_info: AuthorInfo;
  _links: Links;
}

export interface Guid {
  rendered: string;
}

export interface Title {
  rendered: string;
}

export interface Content {
  rendered: string;
  protected: boolean;
}

export interface Excerpt {
  rendered: string;
  protected: boolean;
}

export interface YoastHeadJson {
  title: string;
  robots: Robots;
  og_locale: string;
  og_type: string;
  og_title: string;
  og_description: string;
  og_url: string;
  og_site_name: string;
  article_published_time: string;
  article_modified_time: string;
  og_image: OgImage[];
  author: string;
  twitter_card: string;
  twitter_misc: TwitterMisc;
  schema: Schema;
  description?: string;
}

export interface Robots {
  index: string;
  follow: string;
  'max-snippet': string;
  'max-image-preview': string;
  'max-video-preview': string;
}

export interface OgImage {
  width: number;
  height: number;
  url: string;
  type: string;
}

export interface TwitterMisc {
  'Written by': string;
  'Est. reading time': string;
}

export interface Schema {
  '@context': string;
  '@graph': Graph[];
}

export interface Graph {
  '@type': string;
  '@id': string;
  isPartOf?: IsPartOf;
  author?: Author;
  headline?: string;
  datePublished?: string;
  dateModified?: string;
  mainEntityOfPage?: MainEntityOfPage;
  wordCount?: number;
  publisher?: Publisher;
  articleSection?: string[];
  inLanguage?: string;
  url?: string;
  name?: string;
  breadcrumb?: Breadcrumb;
  potentialAction?: PotentialAction[];
  description?: string;
  itemListElement?: ItemListElement[];
  sameAs?: any[];
  logo?: Logo;
  image?: Image;
}

export interface IsPartOf {
  '@id': string;
}

export interface Author {
  name: string;
  '@id': string;
}

export interface MainEntityOfPage {
  '@id': string;
}

export interface Publisher {
  '@id': string;
}

export interface Breadcrumb {
  '@id': string;
}

export interface PotentialAction {
  '@type': string;
  target: any;
  'query-input'?: string;
}

export interface ItemListElement {
  '@type': string;
  position: number;
  name: string;
  item?: string;
}

export interface Logo {
  '@type': string;
  inLanguage: string;
  '@id': string;
  url: string;
  contentUrl: string;
  width: number;
  height: number;
  caption: string;
}

export interface Image {
  '@type'?: string;
  inLanguage?: string;
  '@id': string;
  url?: string;
  contentUrl?: string;
  caption?: string;
}

export interface AuthorInfo {
  display_name: string;
  author_link: string;
}

export interface Links {
  self: Self[];
  collection: Collection[];
  about: About[];
  author: Author2[];
  replies: Reply[];
  'version-history': VersionHistory[];
  'wp:featuredmedia': Featuredmedum[];
  'wp:attachment': WpAttachment[];
  'wp:term': WpTerm[];
  curies: Cury[];
}

export interface Self {
  href: string;
}

export interface Collection {
  href: string;
}

export interface About {
  href: string;
}

export interface Author2 {
  embeddable: boolean;
  href: string;
}

export interface Reply {
  embeddable: boolean;
  href: string;
}

export interface VersionHistory {
  count: number;
  href: string;
}

export interface Featuredmedum {
  embeddable: boolean;
  href: string;
}

export interface WpAttachment {
  href: string;
}

export interface WpTerm {
  taxonomy: string;
  embeddable: boolean;
  href: string;
}

export interface Cury {
  name: string;
  href: string;
  templated: boolean;
}

export interface MainImage {
  id: string;
  url: string;
}
export interface Blockchain {
  symbol: string;
}
export interface Category {
  name: string;
}

export interface IBlockchainMenu extends Blockchain {
  name: string;
}
export interface IBlockchainMenuPaylod {
  blockchains: IBlockchainMenu[];
}

export interface IUpcomingPostPayload {
  posts: IUpcomingPost[];
}

export interface IUpcomingCategoriesPayload {
  categories: Category[];
}

export type FilterNfts = {
  symbol?: string;
  category: string;
  freeMint?: boolean;
};

export interface IUpcomingPost {
  id: string;
  name: string;
  description: string;
  mainImage: MainImage;
  totalSupply: number;
  saleDate: string;
  saleTimeTbd: boolean;
  featured: boolean;
  freeMint: boolean;
  mintPrice: number;
  mintPriceTbd: boolean;
  website: string;
  twitter: string;
  discord: string;
  instagram: string;
  blockchain: Blockchain;
  category: Category;
}
export interface IUpcomingNfts {
  posts: IUpcomingPost[];
}
export interface CryptoNewsData {
  news_url: string;
  image_url: string;
  title: string;
  text: string;
  source_name: string;
  date: string;
  topics: string[];
  sentiment: string;
  type: string;
}

export interface CryptoNews {
  data: CryptoNewsData[];
  total_pages: number;
}

export type NewsState = {
  cryptoNews: CryptoNewsData[];
  cryptoNewsLoading: boolean;
  crypoNewsTotalPages: number;
  newsData: INettyNews[];
  newsPage: number;
  newsTotalPages: number;
  dashboardNews: CryptoNewsData[];
  dashboardNewsTotalPages: number;
  dashboardNewsLoading: boolean;
  newsDetail: any[];
  upcomingNfts: null | IUpcomingNfts;
  upcomingBlockchainMenu: null | IBlockchainMenu[];
  upcomingCategoryMenu: null | Category[];
  loading: boolean;
  detailLoading: boolean;
};

export type FetchNewsParams = {
  per_page: number;
  page: number;
  categories: number;
  order: string;
  orderby: string;
  isMobile?: boolean;
};

export type FetchCryptoNewsParams = {
  page: number;
  items: number;
  isLoadMore?: boolean;
};

export type FetchUpcomingNftsVariables = {
  dateStart: Moment;
  dateEnd: string;
  symbol?: string;
  postsPerPage: 20;
};
