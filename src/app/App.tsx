import React from 'react';
import './App.css';
import { MyRoutes } from '../common/routes/Routes';
import { NavLink } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <MyRoutes />
      <div className="App">
        <nav>
          <div>
            <NavLink to="/login">Login</NavLink>
          </div>
          <div >
            <NavLink to="/registration">Register</NavLink>
          </div>
          <div>
            <NavLink to="/profile">Profile</NavLink>
          </div>
          <div >
            <NavLink to="/error">404</NavLink>
          </div>
          <div >
            <NavLink to="/password-recovery">Password recovery</NavLink>
          </div>
          <div >
            <NavLink to="/new-password">New password</NavLink>
          </div>
          <div >
            <NavLink to="/test">Test</NavLink>
          </div>
        </nav>
      </div>
    </>
  )
}


