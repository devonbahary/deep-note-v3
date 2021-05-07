import { useState } from 'react';

// https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
export const useDebounce = (fn, delay) => {
  const [currentTimeout, setCurrentTimeout] = useState(null);

  return (...args) => {
      if (currentTimeout) {
          clearTimeout(currentTimeout);
      }
      const curr = setTimeout(() => {
          setCurrentTimeout(null);
          fn(...args);
      }, delay);
      setCurrentTimeout(curr);
  };
}