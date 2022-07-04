import React from 'react';
import style from './Header.module.css';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <nav className={style.nav}>
      <div className={style.item}>
        <NavLink to="/login"
                 className={({ isActive }) => (isActive ? style.activeLink : '')}>Login</NavLink>
      </div>
      <div className={style.item}>
        <NavLink to="/registration"
                 className={({ isActive }) => (isActive ? style.activeLink : '')}>Register</NavLink>
      </div>
      <div className={style.item}>
        <NavLink to="/profile"
                 className={({ isActive }) => (isActive ? style.activeLink : '')}>Profile</NavLink>
      </div>
      <div className={style.item}>
        <NavLink to="/error"
                 className={({ isActive }) => (isActive ? style.activeLink : '')}>404</NavLink>
      </div>
      <div className={style.item}>
        <NavLink to="/passwordrecovery"
                 className={({ isActive }) => (isActive ? style.activeLink : '')}>Password recovery</NavLink>
      </div>
      <div className={style.item}>
        <NavLink to="/newpassword"
                 className={({ isActive }) => (isActive ? style.activeLink : '')}>New password</NavLink>
      </div>
      <div className={style.item}>
        <NavLink to="/test"
                 className={({ isActive }) => (isActive ? style.activeLink : '')}>Test</NavLink>
      </div>
    </nav>
  );
};
