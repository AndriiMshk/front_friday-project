import React, { useEffect } from 'react';
import './App.css';
import { MyRoutes } from '../common/routes/Routes';
import { useAppDispatch, useAppSelector } from './store';
import { authMeTC } from './app-reducer';
import { Preloader } from '../features/preloader/Preloader';
import styles from './App.module.css';
import { ErrorSnackbar } from '../features/ErrorSnackbar/ErrorSnackbar';
import { Header } from '../features/header/Header';

export const App = () => {
  const status = useAppSelector((state) => state.app.status);
  const isInitialized = useAppSelector((state) => state.app.isInitialized);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authMeTC());
  }, [dispatch]);

  if (!isInitialized) {
    return <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
      <Preloader />
    </div>;
  }

  return (
    <>
      <Header />
      {status === 'loading' && <div className={styles.isInitialized}><Preloader /></div>}
      <MyRoutes />
      <ErrorSnackbar />
    </>
  );
};



