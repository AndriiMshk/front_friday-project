import React from 'react';
import { Header } from './header/Header';
import { MyRoutes } from './header/Routes/Routes';

const Main = () => {
  return <div>
    <Header />
    <MyRoutes />
  </div>;
};

export default Main;