const signature = [
  '%c  QUILNOX  %c  Built by Vivek Yadav  %c  github.com/VivekYadav-77  ',
  'background:#4F6EF7;color:#fff;padding:5px 10px;border-radius:6px 0 0 6px;font-family:monospace;font-weight:700;font-size:13px',
  'background:#161B27;color:#818CF8;padding:5px 10px;font-family:monospace;font-size:13px;border-top:1px solid #4F6EF7;border-bottom:1px solid #4F6EF7',
  'background:#0F1117;color:#4B5568;padding:5px 10px;border-radius:0 6px 6px 0;font-family:monospace;font-size:13px;border:1px solid #252D3D',
];
console.log(...signature);
console.log(
  '%c If you are reading this, you know what good code looks like.',
  'color:#4B5568;font-family:monospace;font-size:11px;padding-left:2px'
);

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
