import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../../features/auth/login/Login';
import { Registration } from '../../features/auth/registration/Registration';
import { PasswordRecovery } from '../../features/auth/password-recovery/PasswordRecovery';
import { Profile } from '../../features/profile/Profile';
import { ErrorPage } from '../404-page/ErrorPage';
import { NewPassword } from '../../features/auth/new-password/NewPassword';
import { Packs } from '../../features/Packs/Packs';
import { Cards } from '../../features/Cards/Cards';

export const ProjectRoutes = () => {
  return <div>
    <Routes>
      <Route path={'/'} element={<Navigate to={'/profile'} />} />
      <Route path={'/login'} element={<Login />} />
      <Route path={'/set-new-password'} element={<NewPassword />} />
      <Route path={'/password-recovery'} element={<PasswordRecovery />} />
      <Route path={'/profile'} element={<Profile />} />
      <Route path={'/registration'} element={<Registration />} />
      <Route path={'/packs'} element={<Packs />} />
      <Route path={'/cards/:packId'} element={<Cards />} />
      <Route path={'/404'} element={<ErrorPage />} />
      <Route path={'*'} element={<Navigate to={'/404'} />} />
    </Routes>
  </div>;
};