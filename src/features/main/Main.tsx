import React from 'react';
import { NavLink } from 'react-router-dom';


const Main = () => {
  return (
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
  );
};

export default Main;



