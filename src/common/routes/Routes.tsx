import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import {Login} from '../../features/login/Login';
import {Registration} from '../../features/registration/Registration';
import {PasswordRecovery} from '../../features/password-recovery/PasswordRecovery';
import {Profile} from '../../features/profile/Profile';
import {ErrorPage} from '../404-page/ErrorPage';
import {NewPassword} from '../../features/new-password/NewPassword';


export const ProjectRoutes = () => {
    return <div>
        <Routes>
            <Route path={'/'} element={<Navigate to={'/profile'}/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/set-new-password'} element={<NewPassword/>}/>
            <Route path={'/password-recovery'} element={<PasswordRecovery/>}/>
            <Route path={'/profile'} element={<Profile/>}/>
            <Route path={'/registration'} element={<Registration/>}/>
            <Route path={'/404'} element={<ErrorPage/>}/>
            <Route path={'*'} element={<Navigate to={'/404'}/>}/>
        </Routes>
    </div>;
};