import React from 'react';

import s from './header.module.scss';
import Logo from '../../assets/atom.png';
import { isAuthSelector, logout } from '../../redux/slices/auth'
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

const Header = () => {
  const isAuth = useSelector(isAuthSelector)
  const dispatch = useDispatch()
  const onClickLogout = () => {
    dispatch(logout())
    window.localStorage.removeItem('token');
  }
  return (
    <div className={s.header}>
      <Link to="/" className={s.logo}>
        <img src={Logo} alt="React" />
        <h2>Media</h2>
      </Link>
          {isAuth ?
            <div className={s.login}>
            <Link to="/createpost" className={s.reg}>
                <p>Создать статью</p>
              </Link>
              <Link to="/" onClick={() => onClickLogout()}>
                <p>Выйти</p>
              </Link>
            </div> 
          : <div className={s.login}>
              <Link to="/login">
                <p>Войти</p>
              </Link>
              <Link to="/reg" className={s.reg}>
                <p>Создать аккаунт</p>
              </Link>
            </div>
          }
        </div>
  )
}

export default Header;