import { ReactNode } from 'react';

export type TableData = {
  change: ReactNode;
  heart?: ReactNode;
  collection: ReactNode;
  floorPrice: string | number;
  volume: string | number;
  sales: string | number;
  slug: string;
  id: ReactNode;
  owners: number;
  image: string;
  uniquePercent: string;
  name: string;
};
