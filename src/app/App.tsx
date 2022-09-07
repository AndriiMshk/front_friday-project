import React, { useEffect } from 'react';
import { ProjectRoutes } from '../components/routes/Routes';
import style from './app.module.scss';
import { Header } from '../components/header/Header';
import { useAppDispatch, useAppSelector } from './bll-dal/store';
import { authMe } from './bll-dal/app-async-actions';
import { CircularProgress } from '@mui/material';
import { ErrorSnackbar } from '../common/errorSnackbar/ErrorSnackbar';

function App() {

  const dispatch = useAppDispatch();

  const { isInitialized } = useAppSelector(state => state.app);

  useEffect(() => {dispatch(authMe());}, []);

  if (!isInitialized) {
    return (
      <div className={style.circularProgress}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={style.main}>
      <Header />
      <ProjectRoutes />
      <ErrorSnackbar />
    </div>
  );
}

export default App;
