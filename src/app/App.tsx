import React, { useEffect } from 'react';
import { ProjectRoutes } from '../common/routes/Routes';
import { useAppDispatch, useAppSelector } from './store';
import { authMeTC } from './app-reducer';
import { Preloader } from '../common/preloader/Preloader';
import { ErrorSnackbar } from '../common/ErrorSnackbar/ErrorSnackbar';
import { Header } from '../features/header/Header';
import { Navbar } from '../common/navbar/Navbar';

export const App = () => {

  const isInitialized = useAppSelector((state) => state.app.isInitialized);
  const status = useAppSelector(state => state.app.status);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authMeTC());
  }, []);

  if (!isInitialized) {
    return <Preloader />;
  }

  return <>
    <Header />
    <Navbar />
    {status === 'loading' && <Preloader />}
    <ProjectRoutes />
    <ErrorSnackbar />
  </>
};
