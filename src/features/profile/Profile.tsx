import * as React from 'react';
import { useState } from 'react';
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
import { setNewUserNameTC, UserType } from './profile-reducer';
import { useAppDispatch, useAppSelector } from '../../app/store';

export const Profile = () => {

  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.profile);

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(profile.name);

  // заглушка   значания доставать селектором
  const user: UserType = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    created: '',
    updated: '',
    isAdmin: false,
    verified: false,
    rememberMe: false,
  };

  // заглушка   значания доставать селектором
  const isAuth = true;

  const changeUserNameHandler = () => {
    if (name !== profile.name) {
      dispatch(setNewUserNameTC(user, name));
    }
    setEditMode(false);
  };

  if (!isAuth) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className={style.container}>
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
              <Input
                autoFocus
                id="standard-adornment-password"
                value={name}
                onChange={(e) => setName(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      style={{ height: '24px', width: '54px' }}
                      onClick={changeUserNameHandler}
                    >SAVE
                    </Button>
                  </InputAdornment>
                }
              />
            </FormControl>
          </>
          : <Typography variant="h6" component="div">
            {name}
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