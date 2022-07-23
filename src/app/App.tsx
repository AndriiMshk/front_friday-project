import React from 'react';
import './App.css';
import { MyRoutes } from '../common/routes/Routes';
import { NavLink } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export const App = () => {
  return (
    <>
      <MyRoutes />
      <div className="App">
        <nav>
          <div>
            <NavLink to="/login">Login</NavLink>
          </div>
          <div>
            <NavLink to="/registration">Register</NavLink>
          </div>
          <div>
            <NavLink to="/profile">Profile</NavLink>
          </div>
          <div>
            <NavLink to="/error">404</NavLink>
          </div>
          <div>
            <NavLink to="/password-recovery">Password recovery</NavLink>
          </div>
          <div>
            <NavLink to="/new-password">New password</NavLink>
          </div>
        </nav>
      </div>
    </>
  );
};



