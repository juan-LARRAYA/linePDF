import { useState, useRef, useCallback } from 'react';

const AUTO_HIDE_MS = 3000;

export function useOverlay() {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  const show = useCallback(() => {
    setVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setVisible(false);
    }, AUTO_HIDE_MS);
  }, []);

  const toggle = useCallback(() => {
    setVisible((prev) => {
      if (prev) {
        if (timerRef.current) clearTimeout(timerRef.current);
        return false;
      }
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setVisible(false), AUTO_HIDE_MS);
      return true;
    });
  }, []);

  return { visible, toggle, show, hide };
}
