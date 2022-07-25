import * as React from 'react';
import style from './style.module.css';
import testAva from '../../assets/avatar.png';
import { Avatar } from '@mui/material';
import { useAppSelector } from '../../app/store';

export const Header = () => {

  const profile = useAppSelector(state => state.profile);
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

  return (
    <div className={style.container}>
      <div>IT-INCUBATOR</div>
      {isLoggedIn && <div className={style.info}>
        {profile.name}
        <Avatar style={{ height: '36px', width: '36px' }} alt="Remy Sharp"
                src={profile.avatar ? profile.avatar : testAva} />
      </div>}
    </div>
  );
};

// придумать что то с логотипом инкубатора