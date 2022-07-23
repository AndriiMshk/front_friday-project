import React from 'react';
import './App.css';
import { MyRoutes } from '../common/routes/Routes';
import Main from '../features/main/Main';

export const App = () => {
  return (
    <>
      <Main />
      <MyRoutes />
    </>
  )
}


