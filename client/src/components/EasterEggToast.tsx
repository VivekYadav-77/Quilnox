import { useEffect } from 'react';

interface EasterEggToastProps {
  visible: boolean;
  onDone: () => void;
}

const keys = ['↑', '↑', '↓', '↓', '←', '→', '←', '→', 'B', 'A'];

const EasterEggToast = ({ visible, onDone }: EasterEggToastProps) => {
  useEffect(() => {
    if (!visible) return undefined;

    const timer = window.setTimeout(onDone, 3900);

    return () => window.clearTimeout(timer);
  }, [visible, onDone]);

  if (!visible) return null;

  return (
    <div
      style={{
        bottom: 24,
        left: '50%',
        animation: 'easter-toast 3.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        pointerEvents: 'none',
        position: 'fixed',
        transform: 'translateX(-50%)',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          alignItems: 'center',
          background: '#161B27',
          border: '1px solid rgba(79,110,247,0.4)',
          borderRadius: 12,
          boxShadow:
            '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(79,110,247,0.1), 0 0 40px rgba(79,110,247,0.15)',
          display: 'flex',
          fontFamily: 'DM Sans, sans-serif',
          gap: 10,
          padding: '12px 20px',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ animation: 'spin 0.4s ease', fontSize: 18 }}>⚡</span>

        <div>
          <p style={{ color: '#F0F4FF', fontSize: 13, fontWeight: 600, margin: 0 }}>You found it.</p>
          <p style={{ color: '#818CF8', fontFamily: 'monospace', fontSize: 11, margin: '2px 0 0' }}>
            Built by Vivek Yadav · github.com/VivekYadav-77
          </p>
        </div>

        <div style={{ display: 'flex', gap: 2, marginLeft: 8, opacity: 0.5 }}>
          {keys.map((key, index) => (
            <span
              key={`${key}-${index}`}
              style={{
                background: '#252D3D',
                borderRadius: 3,
                color: '#4B5568',
                fontFamily: 'monospace',
                fontSize: 8,
                padding: '1px 3px',
              }}
            >
              {key}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EasterEggToast;
