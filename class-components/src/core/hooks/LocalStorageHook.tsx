import { useCallback, useState } from 'react';

function LocalStorageHook<T>(key: string, initialValue: T) {
  const [stored, setStored] = useState(() => {
    try {
      const item: string | null = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value: T) => {
    try {
      setStored(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.error(`Unable to save: ${key}`);
    }
  }, [key]);

  return [stored, setValue] as const;
}

export default LocalStorageHook;