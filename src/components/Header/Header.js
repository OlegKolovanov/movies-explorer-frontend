import React from 'react';
import './Header.css';

import { useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import NavTab from '../NavTab/NavTab';

function Header(props) {
  const location = useLocation();
  return (
    <header className={
      location.pathname === '/' ? 'header header__landing' : 'header'}>
      <Logo />
      {props.loggedIn === false ? <NavTab /> : <Navigation />}
    </header>
  );
}

export default Header;