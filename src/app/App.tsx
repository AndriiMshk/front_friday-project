import React, { useEffect } from 'react';
import './App.css';
import { MyRoutes } from '../common/routes/Routes';
import { useAppDispatch, useAppSelector } from './store';
import { authMeTC } from './app-reducer';
import { Preloader } from '../features/preloader/Preloader';
import { ErrorSnackbar } from '../features/ErrorSnackbar/ErrorSnackbar';
import { Header } from '../features/header/Header';
import { Navbar } from '../features/navbar/Navbar';

export const App = () => {
  const status = useAppSelector((state) => state.app.status);
  const isInitialized = useAppSelector((state) => state.app.isInitialized);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authMeTC());
  }, [dispatch]);

  if (!isInitialized) {
    return <Preloader />;
  }

  return (
    <>
      <Header />
      <Navbar/>
      {status === 'loading' && <Preloader />}
      <MyRoutes />
      <ErrorSnackbar />
    </>
  );
};



