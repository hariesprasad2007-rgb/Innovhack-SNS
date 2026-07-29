import { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../lib/utils';

export function useLocalStore<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return getLocalStorage<T>(key, initialValue);
  });

  useEffect(() => {
    setLocalStorage<T>(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
