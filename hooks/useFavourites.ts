import { SyntheticEvent, useState } from 'react';

import { toggleFavoriteApi } from '../api/api';

const useFavourite = () => {
  const [favorites, setFavorites] = useState<Set<number | string>>(new Set());
  const handleLikeToggle = async (e: SyntheticEvent, { itemId, category }: { itemId: number | string; category: 'NFTSales' | 'CryptoSales' }) => {
    e.stopPropagation();
    await toggleFavoriteApi({ itemId, category, value: !favorites.has(itemId) });
    if (!favorites.has(itemId)) {
      setFavorites((prev) => {
        prev.add(itemId);
        return new Set(prev);
      });
    } else {
      setFavorites((prev) => {
        prev.delete(itemId);
        return new Set(prev);
      });
    }
  };
  return { favorites, handleLikeToggle, setFavorites };
};
export default useFavourite;
