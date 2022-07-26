import * as React from 'react';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import style from './style.module.css';
import { Button, Paper } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { Navigate } from 'react-router-dom';
import { setNewUserNameTC } from './profile-reducer';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { useFormik } from 'formik';
import { logoutTC } from '../login/login-reducer';
import { Preloader } from '../preloader/Preloader';
import { authMeTC } from '../../app/app-reducer';
import { EditNameForm } from './components/EditNameForm';
import { AvatarComponent } from './components/AvatarComponent';

export const Profile = () => {

  const profile = useAppSelector(state => state.profile);
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
  const status = useAppSelector(state => state.app.status);

  const formik = useFormik({
    initialValues: {
      name: profile.name,
    },
    onSubmit: values => {
      if (values.name.trim() !== profile.name) {
        dispatch(setNewUserNameTC(values.name));
      } else {
        values.name = profile.name;
      }
      setEditMode(false);
    },
  });

  useEffect(() => {formik.initialValues.name = profile.name;}, [profile]);
  useEffect(() => {dispatch(authMeTC());}, []);

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />;
  }

  if (status === 'loading') {
    return <Preloader />;
  }

  return (

    <div className={style.container}>
      <Paper className={style.content}>
        <Typography
          style={{ marginTop: '27px', fontWeight: '600' }}
          variant="h5" component="div">
          Personal Information
        </Typography>
        <AvatarComponent avatar={profile.avatar}/>
        {editMode
          ? <EditNameForm
            name={profile.name}
            handleChange={formik.handleChange}
            handleSubmit={formik.handleSubmit}
            newName={formik.values.name}
            setEditMode={setEditMode}
          />
          : <Typography variant="h6" component="div">
            {profile.name}
            <BorderColorOutlinedIcon
              style={{ cursor: 'pointer', height: '15px', width: '15px', paddingLeft: '5px' }}
              onClick={() => setEditMode(true)}
            />
          </Typography>}
        <Typography
          style={{ fontSize: '14px', marginBottom: '29px' }}
          color="text.secondary">
          {profile.email}
        </Typography>
        <Button
          onClick={() => {dispatch(logoutTC());}}
          style={{
            background: '#fcfcfc',
            border: 'none',
            borderRadius: '30px',
            boxShadow: '0px 2px 10px rgba(109, 109, 109, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.3)',
            marginBottom: '36px',
            color: '#000000',
          }}
          variant="outlined"
          startIcon={<ExitToAppIcon />}>
          Log out
        </Button>
      </Paper>
    </div>
  );
};