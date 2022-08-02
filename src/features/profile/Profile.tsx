import * as React from 'react';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import style from './style.module.css';
import { Button, Paper } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import {Navigate, useNavigate} from 'react-router-dom';
import { setNewUserNameTC } from './profile-reducer';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { useFormik } from 'formik';
import { logoutTC } from '../auth/auth-reducer';
import { EditNameForm } from './components/EditNameForm';
import { AvatarComponent } from './components/AvatarComponent';

export const Profile = () => {

  const email = useAppSelector(state => state.profile.email);
  const name = useAppSelector(state => state.profile.name);
  const avatar = useAppSelector(state => state.profile.avatar);
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: name,
    },
    validate: (values) => {
      const errors: { name?: string } = {};
      if (!values.name) {
        errors.name = 'Required';
      }
      if (values.name.length > 20) {
        errors.name = 'To long name';
      }
      return errors;
    },
    onSubmit: values => {
      if (values.name.trim() !== name) {
        dispatch(setNewUserNameTC(values.name));
      } else {
        values.name = name;
      }
      setEditMode(false);
    },
  });

  useEffect(() => {
      formik.initialValues.name = name;
    },
    [name]);

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className={style.container}>
      <Menu />
      <Paper className={style.content} elevation={4}>
        <Typography
          style={{ marginTop: '27px', marginBottom: '30px', fontWeight: '600' }}
          variant="h5" component="div">
          Personal Information
        </Typography>
        <AvatarComponent avatar={avatar} />
        {editMode
          ? <EditNameForm
            name={name}
            handleChange={formik.handleChange}
            handleSubmit={formik.handleSubmit}
            newName={formik.values.name}
            setEditMode={setEditMode}
            error={formik.errors.name}
          />
          : <Typography variant="h6" component="div" style={{marginTop: '17px', marginBottom: '14px'}}>
            {name}
            <BorderColorOutlinedIcon
              style={{ cursor: 'pointer', height: '16px', width: '16px', marginLeft: '9px', marginBottom: '-1px' }}
              onClick={() => setEditMode(true)}
            />
          </Typography>}
        <Typography
          style={{ fontSize: '14px', marginBottom: '29px' }}
          color="text.secondary">
          {email}
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
            textTransform: 'none',
            fontSize: '16px',
          }}
          variant="outlined"
          startIcon={<ExitToAppIcon />}>
          Log out
        </Button>
      </Paper>
    </div>
  )
};

const Menu = () => {
  const navigate = useNavigate()

  return <div className={style.wrapper} onClick={() => navigate('/packs')}>

    <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 5.5H2M2 5.5L6.66667 1M2 5.5L6.66667 10" stroke="black" strokeWidth="2"/>
    </svg>

    <span className={style.back}>Back To Packs List</span>
  </div>
};
