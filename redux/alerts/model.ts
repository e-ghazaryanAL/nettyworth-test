export interface ISettings {
  id: number;
  userId: number;
  CryptoSales: number;
  NFTSales: number;
  Upcoming: number;
  News: number;
  createdAt: string;
  updatedAt: string;
  subscriberId: any;
  favoriteId: any;
}

export interface IAlert {
  category: string;
  seen: number;
  title?: string;
  description: string;
  name?: string;
  saleDate?: string;
  collection_name?: string;
  floor_price?: number;
}

export interface INotification {
  notifications: IAlert[];
  settings: ISettings;
}

export interface IAlertState {
  notification: null | INotification;
  loading: boolean;
}

export type AlertCategory = 'CryptoSales' | 'NFTSales' | 'Upcoming' | 'News';
