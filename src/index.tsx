import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './app/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter, HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/*<HashRouter>*/}
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/*</HashRouter>*/}
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
