import { useEffect, useRef } from 'react';

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export const useKonami = (onActivate: () => void): void => {
  const bufferRef = useRef<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      bufferRef.current = [...bufferRef.current, event.key].slice(-KONAMI_SEQUENCE.length);

      if (bufferRef.current.join(',') === KONAMI_SEQUENCE.join(',')) {
        bufferRef.current = [];
        onActivate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onActivate]);
};
