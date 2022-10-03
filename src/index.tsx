import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/app/App';

import './styles/index.scss';

// eslint-disable-next-line import/no-named-as-default-member
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <>
    <App />
  </>
);
