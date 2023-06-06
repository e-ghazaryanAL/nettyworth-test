import { useState } from 'react';

const useMobileSearch = () => {
  const [mobileSearchVisible, setMobileSearchVisible] = useState<boolean>(false);
  const searchModalHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setMobileSearchVisible((prev) => !prev);
  };
  return {
    mobileSearchVisible,
    searchModalHandler,
  };
};

export default useMobileSearch;
