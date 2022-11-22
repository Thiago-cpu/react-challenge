import { useCallback, useEffect, useState } from "react";

export default function useLocalStorage(
  key: string,
  initialValue: string
): [string | null, (value: string) => void] {
  const [storedValue, setStoredValue] = useState<string | null>(() => {
    try {
      const item = localStorage.getItem(key);
      if (!item) localStorage.setItem(key, initialValue);
      return item || initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const saveValue = useCallback(
    (value: string) => {
      setStoredValue(value);
      localStorage.setItem(key, value);
      dispatchEvent(new Event("storage"));
      dispatchEvent(new Event("local-storage"));
    },
    [setStoredValue, key]
  );

  useEffect(() => {
    const handleLocalStorage = () => {
      const newValue = localStorage.getItem(key);
      setStoredValue(newValue);
    };
    window.addEventListener("local-storage", handleLocalStorage);
    window.addEventListener("storage", handleLocalStorage);

    return () => {
      window.removeEventListener("local-storage", handleLocalStorage);
      window.removeEventListener("storage", handleLocalStorage);
    };
  }, [key]);

  return [storedValue, saveValue];
}
