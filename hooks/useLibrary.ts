import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface PDFEntry {
  uri: string;
  name: string;
  lastOpened: number;
  totalPages: number;
}

const STORAGE_KEY = 'linepdf_library';

export function useLibrary() {
  const [library, setLibrary] = useState<PDFEntry[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) setLibrary(JSON.parse(raw));
    });
  }, []);

  const addOrUpdate = useCallback((entry: PDFEntry) => {
    setLibrary((prev) => {
      const filtered = prev.filter((e) => e.uri !== entry.uri);
      const next = [entry, ...filtered].slice(0, 50);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const remove = useCallback((uri: string) => {
    setLibrary((prev) => {
      const next = prev.filter((e) => e.uri !== uri);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { library, addOrUpdate, remove };
}
