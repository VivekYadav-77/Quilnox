# Quilnox  — Easter Egg Integration Guide

## Overview

Integrate three layered easter eggs into the Zyphor project.
Each targets a different type of person who inspects the code.

| Layer | Trigger | Target |
|---|---|---|
| Console Signature | Open DevTools | Any developer |
| HTML Comment | View Page Source (Ctrl+U) | Source-code inspectors |
| Konami Code | ↑↑↓↓←→←→BA | People you personally tell |

All three are passive — they do not affect normal app behavior in any way.

---

## What to Replace

Everywhere you see `[YourName]` and `[YourGitHub]` in this file, replace with your actual name and GitHub username before implementing.

---

## Step 1 — Console Signature

**File:** `client/src/main.tsx`

Add this block at the very top of the file, before any imports render the app.
It must run before React mounts so it appears at the top of the console, not buried.

```typescript
// ─── Zyphor Signature ───────────────────────────────────────────────
const _sig = [
  '%c  ⚡ ZYPHOR  %c  Built by [YourName]  %c  github.com/[YourGitHub]  ',
  'background:#4F6EF7;color:#fff;padding:5px 10px;border-radius:6px 0 0 6px;font-family:monospace;font-weight:700;font-size:13px',
  'background:#161B27;color:#818CF8;padding:5px 10px;font-family:monospace;font-size:13px;border-top:1px solid #4F6EF7;border-bottom:1px solid #4F6EF7',
  'background:#0F1117;color:#4B5568;padding:5px 10px;border-radius:0 6px 6px 0;font-family:monospace;font-size:13px;border:1px solid #252D3D',
];
console.log(..._sig);
console.log(
  '%c If you are reading this, you know what good code looks like.',
  'color:#4B5568;font-family:monospace;font-size:11px;padding-left:2px'
);
// ────────────────────────────────────────────────────────────────────
```

**Result:** Anyone who opens the browser console sees a styled three-part banner with your name and GitHub link, followed by a subtle one-liner.

---

## Step 2 — HTML Comment in index.html

**File:** `client/index.html`

Add this block directly after the opening `<head>` tag:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!--
    ╔═══════════════════════════════════════════════╗
    ║              ⚡  Q U I L N O X                 ║
    ║                                               ║
    ║   Designed & Built by [YourName]              ║
    ║   github.com/[YourGitHub]                     ║
    ║                                               ║
    ║   Stack: React · TypeScript · Node · MongoDB  ║
    ║   If you found this — you're curious.         ║
    ║   That's a good sign.                         ║
    ╚═══════════════════════════════════════════════╝
    -->
    <meta charset="UTF-8" />
    <!-- rest of head -->
```

**Result:** Anyone who hits `Ctrl+U` (View Page Source) or opens the Elements panel and scrolls to the top of the document sees this immediately. It looks intentional and professional.

---

## Step 3 — Konami Code Easter Egg

This is the most impressive one. Implement it in three parts.

### 3a — The Hook

**Create file:** `client/src/hooks/useKonami.ts`

```typescript
import { useEffect, useRef } from 'react';

const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

export const useKonami = (onActivate: () => void): void => {
  const bufferRef = useRef<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      bufferRef.current = [...bufferRef.current, e.key].slice(-KONAMI_SEQUENCE.length);

      if (bufferRef.current.join(',') === KONAMI_SEQUENCE.join(',')) {
        bufferRef.current = [];
        onActivate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onActivate]);
};
```

### 3b — The Toast Component

**Create file:** `client/src/components/EasterEggToast.tsx`

```tsx
import { useEffect, useState } from 'react';

interface EasterEggToastProps {
  visible: boolean;
  onDone: () => void;
}

export default function EasterEggToast({ visible, onDone }: EasterEggToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!visible) return;

    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      // Give fade-out time before telling parent it's done
      setTimeout(onDone, 400);
    }, 3500);

    return () => clearTimeout(timer);
  }, [visible, onDone]);

  if (!visible && !show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: show ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(16px)',
        opacity: show ? 1 : 0,
        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 20px',
          borderRadius: '12px',
          background: '#161B27',
          border: '1px solid rgba(79,110,247,0.4)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(79,110,247,0.1), 0 0 40px rgba(79,110,247,0.15)',
          fontFamily: 'DM Sans, sans-serif',
          whiteSpace: 'nowrap',
        }}
      >
        {/* Animated zap icon */}
        <span style={{ fontSize: '18px', animation: 'spin 0.4s ease' }}>⚡</span>

        <div>
          <p style={{ color: '#F0F4FF', fontWeight: 600, fontSize: '13px', margin: 0 }}>
            You found it.
          </p>
          <p style={{ color: '#818CF8', fontSize: '11px', margin: '2px 0 0', fontFamily: 'monospace' }}>
            Built by [YourName] · github.com/[YourGitHub]
          </p>
        </div>

        {/* Konami label */}
        <div
          style={{
            display: 'flex',
            gap: '2px',
            marginLeft: '8px',
            opacity: 0.5,
          }}
        >
          {['↑', '↑', '↓', '↓', '←', '→', '←', '→', 'B', 'A'].map((k, i) => (
            <span
              key={i}
              style={{
                fontSize: '8px',
                padding: '1px 3px',
                borderRadius: '3px',
                background: '#252D3D',
                color: '#4B5568',
                fontFamily: 'monospace',
              }}
            >
              {k}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### 3c — Wire It Into Layout

**File:** `client/src/components/Layout.tsx`

Add these imports at the top:
```typescript
import { useState, useCallback } from 'react';
import { useKonami } from '../hooks/useKonami';
import EasterEggToast from './EasterEggToast';
```

Inside the `Layout` component function, add:
```typescript
const [easterEggVisible, setEasterEggVisible] = useState(false);

const activateEasterEgg = useCallback(() => {
  setEasterEggVisible(true);
}, []);

useKonami(activateEasterEgg);
```

At the very bottom of the Layout return, just before the closing `</div>`, add:
```tsx
<EasterEggToast
  visible={easterEggVisible}
  onDone={() => setEasterEggVisible(false)}
/>
```

---

## Step 4 — Add the Spin Keyframe

**File:** `client/src/index.css`

Add this inside your existing `@layer` block or at the bottom of the file:

```css
@keyframes spin {
  from { transform: rotate(0deg) scale(1); }
  50%  { transform: rotate(180deg) scale(1.3); }
  to   { transform: rotate(360deg) scale(1); }
}
```

---

## Verification Checklist

After implementing all three steps, verify each works:

- [ ] Open browser DevTools → Console tab → styled Zyphor banner appears at top
- [ ] Press `Ctrl+U` in browser → HTML comment with your name is visible in `<head>`
- [ ] On any page of the app, type: `↑ ↑ ↓ ↓ ← → ← → B A` (keyboard) → toast slides up from bottom
- [ ] Toast disappears after ~3.5 seconds on its own
- [ ] Konami toast does NOT appear twice if triggered while already visible
- [ ] Normal app behavior is completely unaffected by all three additions
- [ ] `tsc --noEmit` still passes with zero errors after changes

---

## Important Notes

- The `useRef` in `useKonami` is intentional — using `useState` for the buffer would cause stale closure bugs. Do not change it to `useState`.
- The toast uses inline styles intentionally — it must work even if Tailwind purges CSS classes that only appear conditionally.
- Do not add `console.log` in the Konami handler — that would make it trivially discoverable in the sources panel.
- The HTML comment survives production builds with Vite by default. If you ever add an HTML minifier plugin, make sure comment preservation is on.
