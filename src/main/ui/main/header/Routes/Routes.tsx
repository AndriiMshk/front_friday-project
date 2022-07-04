import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from '../Login/Login';
import { Registration } from '../Registration/Registration';
import { PasswordRecovery } from '../PasswordRecovery/PasswordRecovery';
import { Profile } from '../Profile/Profile';
import { Test } from '../Test/Test';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { NewPassword } from '../NewPassword/NewPassword';

export const MyRoutes = () => {
  return <div>
    <Routes>
      <Route path={'/login'} element={<Login />} />
      <Route path={'/newpassword'} element={<NewPassword />} />
      <Route path={'/passwordrecovery'} element={<PasswordRecovery />} />
      {/*??????*/}
      <Route path={'/profile'} element={<Profile />} />
      <Route path={'/'} element={<Profile />} />

      <Route path={'registration'} element={<Registration />} />
      <Route path={'test'} element={<Test />} />

      <Route path={'/error'} element={<ErrorPage />} />
    </Routes>
  </div>;
};