import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import Dashboard from '../Layout';
import s from '../../styles/Sidebar.module.scss';
import LinksGroup from './LinksGroup/LinksGroup';

const Sidebar = ({ sidebarOpen }) => {
  // console.log(sidebarOpen);
  return (
    <nav className={sidebarOpen ? s.root : s.toggled}>
      <header className={s.logo}>
        <Link to='/'>
          <img src={require('../../images/logo.jpg')} alt='logo' />
        </Link>
      </header>
      <ul className={s.nav}>
        <LinksGroup header='Dashboard' headerLink='/app/dashboard' />
        <LinksGroup header='Home' headerLink='/app/home' />
        <LinksGroup header='Donors' headerLink='/app/donors' />
        <LinksGroup
          header='Requests'
          headerLink='/app/requests'
          childrenLinks={[
            {
              name: 'Open Requests',
              link: '/app/requests/open',
            },
            {
              name: 'Closed Requests',
              link: '/app/requests/close',
            },
          ]}
        />
        <LinksGroup header='Users' headerLink='/app/users' />
      </ul>
    </nav>
  );
};

export default Sidebar;
