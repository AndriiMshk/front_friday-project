import * as React from 'react';
import style from './style.module.css';
import testAva from '../../assets/avatar.png';
import { Avatar } from '@mui/material';
import { useAppSelector } from '../../app/store';
import incubatorLogo from '../../assets/incubator.png'

export const Header = () => {

  const profile = useAppSelector(state => state.profile);
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

  return (
    <div className={style.container}>
      <div style={{width: '209px', height: '48px'}}><img src={incubatorLogo} alt="it-incubator" /></div>
      {isLoggedIn && <div className={style.info}>
        {profile.name}
        <Avatar style={{ height: '36px', width: '36px' }} alt="Remy Sharp"
                src={profile.avatar ? profile.avatar : testAva} />
      </div>}
    </div>
  );
};
