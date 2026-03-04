import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import './styles/reset.scss';
import App from './App.tsx';
import { isProduction } from '@web/utils/miscUtils.ts';

const basePath = isProduction ? '/mabinogi-misc' : '/';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter basename={basePath}>
      <App />
    </HashRouter>
  </StrictMode>,
);
