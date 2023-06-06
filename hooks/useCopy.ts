import { useRef, useState } from 'react';

import useOnClickOutside from './useOnClickOutside';

const useCopy = <T>(value: T) => {
  const copyRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const copyHandler = () => {
    setCopied(true);
    if (typeof navigator !== 'undefined') {
      navigator?.clipboard?.writeText(value as string);
    }
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  useOnClickOutside(copyRef, () => setCopied(false));

  return { copied, copyHandler, copyRef };
};

export default useCopy;
