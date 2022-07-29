import React, { useState } from 'react';
import style from '../header/style.module.css';
import { Link } from 'react-router-dom';

export const Navbar = () => {

  const [show, setShow] = useState(false);

  return (
    <>
      <button onClick={() => {setShow(!show);}}>nav</button>
      {show && <div className={style.dropdown}>
        <div className={style.dropdownContent}>
          <Link to="/"> Главная </Link>
          <Link to="/login"> Вход </Link>
          <Link to="/registration"> Регистрация </Link>
          <Link to="/profile"> Профиль </Link>
          <Link to="/404"> 404 </Link>
          <Link to="/password-recovery"> Восстановление пароля </Link>
          <Link to="/set-new-password"> Смена пароля </Link>
        </div>
      </div>}
    </>
  );
};