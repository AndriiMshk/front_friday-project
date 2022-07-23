import * as React from 'react';
import style from './style.module.css';
import testAva from '../../assets/avatar.png';
import { Avatar } from '@mui/material';
import { useAppSelector } from '../../app/store';

export const Header = () => {
  const name = useAppSelector(state => state.profile.name);

  return (
    <div className={style.container}>
      <div>IT-INCUBATOR</div>
      <div className={style.info}>
        {name}
        <Avatar style={{ height: '36px', width: '36px' }} alt="Remy Sharp" src={testAva} />
      </div>
    </div>
  );
};

// придумать что то с логотипом инкубатора