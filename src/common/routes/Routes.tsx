import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from '../../features/login/Login';
import { Registration } from '../../features/registration/Registration';
import { PasswordRecovery } from '../../features/password-recovery/PasswordRecovery';
import { Profile } from '../../features/profile/Profile';
import { ErrorPage } from '../../features/error-page/ErrorPage';
import { NewPassword } from '../../features/new-password/NewPassword';

export const MyRoutes = () => {
  return <div>
    <Routes>
      <Route path={'/login'} element={<Login />} />
      <Route path={'/new-password'} element={<NewPassword />} />
      <Route path={'/password-recovery'} element={<PasswordRecovery />} />

      {/*??????*/}
      <Route path={'/profile'} element={<Profile />} />
      <Route path={'/'} element={<Profile />} />

      <Route path={'registration'} element={<Registration />} />
      <Route path={'/error'} element={<ErrorPage />} />
    </Routes>
  </div>;
};