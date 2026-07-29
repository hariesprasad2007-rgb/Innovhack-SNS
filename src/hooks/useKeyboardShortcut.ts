import { useEffect } from 'react';

type KeyCombo = {
  key: string;
  metaOrControl?: boolean;
  shift?: boolean;
  alt?: boolean;
};

export function useKeyboardShortcut(
  combo: KeyCombo,
  callback: (e: KeyboardEvent) => void,
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const matchKey = event.key.toLowerCase() === combo.key.toLowerCase();
      const matchMeta = combo.metaOrControl
        ? event.metaKey || event.ctrlKey
        : !event.metaKey && !event.ctrlKey;
      const matchShift = combo.shift ? event.shiftKey : !event.shiftKey;
      const matchAlt = combo.alt ? event.altKey : !event.altKey;

      if (matchKey && matchMeta && matchShift && matchAlt) {
        // Prevent default browser action for common app shortcuts like Cmd+K
        event.preventDefault();
        callback(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [combo, callback, enabled]);
}
