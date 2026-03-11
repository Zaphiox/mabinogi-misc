import { useState, useEffect } from 'react';

function useLocalStorage(key: string, defaultValue: any): [any, React.Dispatch<any>] {
  const [value, setValue] = useState(() => {
    // Lazy initialization: run this function only on the first render
    if (typeof window === 'undefined') return defaultValue; // Handle SSR

    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    // Update localStorage whenever the state changes
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export { useLocalStorage };
