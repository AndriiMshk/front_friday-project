import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../auth/login/Login';
import { Registration } from '../auth/registration/Registation';
import { PasswordRecovery } from '../auth/passwordRecovery/PasswordRecovery';
import { CheckEmail } from '../auth/checkEmail/CheckEmail';
import { NewPassword } from '../auth/newPassword/NewPassword';
import { Profile } from '../profile/Profile';
import { Packs } from '../packs/Packs';
import { Cards } from '../cards/Cards';
import { Learn } from '../learn/Learn';
import { ErrorPage } from '../../common/errorPage/ErrorPage';

export const ProjectRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path={'/'} element={<Navigate to={'/profile'} />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/set-new-password/:token'} element={<NewPassword />} />
        <Route path={'/password-recovery'} element={<PasswordRecovery />} />
        <Route path={'/password-recovery/:email'} element={<CheckEmail />} />
        <Route path={'/profile'} element={<Profile />} />
        <Route path={'/registration'} element={<Registration />} />
        <Route path={'/packs'} element={<Packs />} />
        <Route path={'/cards/:packId'} element={<Cards />} />
        <Route path={'/learn/:packId'} element={<Learn />} />
        <Route path={'/404'} element={<ErrorPage />} />
        <Route path={'*'} element={<Navigate to={'/404'} />} />
      </Routes>
    </div>);
};
