import { useState } from 'react';

const useSearch = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const handleSearch = (val: string) => {
    setSearchValue(val);
  };
  return {
    searchValue,
    handleSearch,
  };
};

export default useSearch;
