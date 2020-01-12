import React from 'react';
import classes from './Toolbar.module.css';

import Logo from '../../Logo/Logo';
import Hamburger from '../SideDrawer/Hamburger/Hamburger'
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <Hamburger clicked={props.open} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth}/>
    </nav>
  </header>
)

export default toolbar;