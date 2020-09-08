import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import Dashboard from '../Layout';
import s from '../../styles/Sidebar.module.scss';
import LinksGroup from './LinksGroup/LinksGroup';

const Sidebar = ({ sidebarOpen }) => {
  // console.log(sidebarOpen);
  return (
    <nav className={s.root}>
      <header className={s.logo}>
        <Link to='/'>
          <img src={require('../../images/logo.jpg')} alt='logo' />
        </Link>
      </header>
      <ul className={s.nav}>
        <LinksGroup header='Dashboard' headerLink='/dashboard' />
        <LinksGroup header='Donors' headerLink='/donors' />
        <LinksGroup header='Requests' headerLink='/requests' />
        <LinksGroup header='Users' headerLink='/users' />
      </ul>
    </nav>
  );
};

export default Sidebar;
