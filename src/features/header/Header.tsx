import * as React from 'react';
import style from './style.module.css';
import testAva from '../../assets/avatar.png';
import { Avatar } from '@mui/material';
import { useAppSelector } from '../../app/store';
import { Link } from 'react-router-dom';

export const Header = () => {

  const name = useAppSelector(state => state.profile.name);

  return (
    <div className={style.container}>
      <div className={style.dropdown}>
        <div>IT-INCUBATOR</div>
        <div className={style.dropdownContent}>
          <Link to='/' > Главная </Link>
          <Link to='/login' > Вход </Link>
          <Link to='/registration' > Регистрация </Link>
          <Link to='/profile' > Профиль </Link>
          <Link to='/404' > 404 </Link>
          <Link to='/password-recovery' > Восстановление пароля </Link>
          <Link to='/set-new-password' > Смена пароля </Link>
        </div>
      </div>

      <div className={style.info}>
        {name}
        <Avatar style={{ height: '36px', width: '36px' }} alt="Remy Sharp" src={testAva} />
      </div>
    </div>
  );
};

// TODO придумать что то с логотипом инкубатора