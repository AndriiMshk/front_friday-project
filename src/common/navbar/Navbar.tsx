import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {

  return (
    <>
      {/*<div className={style.dropdownContent}>*/}
      <div>
        <Link to="/"> Главная </Link>
        <Link to="/login"> Вход </Link>
        <Link to="/registration"> Регистрация </Link>
        <Link to="/profile"> Профиль </Link>
        <Link to="/404"> 404 </Link>
        <Link to="/password-recovery"> Восстановление пароля </Link>
        <Link to="/set-new-password"> Смена пароля </Link>
        <Link to="/packs"> Колоды </Link>
        <Link to="/cards/:packId"> Карточки </Link>
      </div>
    </>
  );
};
