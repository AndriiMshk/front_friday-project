import * as React from 'react';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import style from './style.module.css';
import { Button, FormControl, IconButton, Input, Paper } from '@mui/material';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import testAva from '../../assets/avatar.png';
import { input } from '@testing-library/user-event/dist/types/utils';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { InputAdornment } from '@material-ui/core';
import { Navigate } from 'react-router-dom';
import { setNewUserNameTC, setProfileAC } from './profile-reducer';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { useFormik } from 'formik';
// временный импорт для проверки
import axios from 'axios';

export const Profile: React.FC = () => {

  const profile = useAppSelector(state => state.profile);
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);

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

  // ====================================== заглушка   значания доставать селектором
  const isLogin = false;

  const testLogin = () => {
    axios.post('http://localhost:7542/2.0/auth/login',
      { email: 'test031@gmail.com', password: '123123123123', rememberMe: false }, { withCredentials: true })
      .then((res) => {
        dispatch(setProfileAC(res.data));
      });
  };

  const testLoguot = () => {
    axios.delete('http://localhost:7542/2.0/auth/me', { withCredentials: true });
  };
  // ========================================

  if (!isLogin) {
    return <Navigate to={'/login'} />;
  }

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.code === 'Escape') {
      setEditMode(false);
      formik.values.name = profile.name;
    }
  };

  return (
    <div className={style.container}>
      {/*====================================== временные кнопки для проверки*/}
      <button onClick={testLogin}>TEST LOGIN</button>
      <button onClick={testLoguot}>TEST LOGUOT</button>
      {/*====================================== */}
      <Paper className={style.content}>
        <Typography
          style={{ marginTop: '27px', fontWeight: '600' }}
          variant="h5" component="div">
          Personal Information
        </Typography>
        <Badge
          style={{ width: '96px', height: '96px' }}
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <IconButton
              style={{
                background: '#808080',
                border: '1px solid #FFFFFF',
                color: '#ffffff',
                width: '32px',
                height: '32px',
              }}
              aria-label="upload picture"
              component="label">
              <input hidden accept="image/*" type="file" />
              <CameraAltOutlinedIcon style={{ height: '16px' }} />
            </IconButton>
          }>
          <Avatar style={{ width: '100%', height: '100%' }}
                  alt="ava"
                  src={profile.avatar ? profile.avatar : testAva}
          />
        </Badge>
        {editMode
          ? <>
            <FormControl>
              <form onSubmit={formik.handleSubmit}>
                <Input
                  autoFocus
                  autoComplete={'off'}
                  onKeyDown={onKeyDownHandler}
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={() => formik.handleSubmit()}
                  endAdornment={
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        style={{ height: '24px', width: '54px' }}
                        type={'submit'}
                      >SAVE
                      </Button>
                    </InputAdornment>
                  }
                />
              </form>
            </FormControl>
          </>
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
          onClick={() => {console.log('Log out clicked');}}
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