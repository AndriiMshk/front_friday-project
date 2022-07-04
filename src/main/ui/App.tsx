import React from 'react';
import './App.css';
import Main from './main/Main';
import { Provider } from 'react-redux';
import { store } from '../bll/store';
import { HashRouter } from 'react-router-dom';

export const App = () => (
  <div className="App">
    <Provider store={store}>
      <HashRouter>
        <Main />
      </HashRouter>
    </Provider>
  </div>
);


