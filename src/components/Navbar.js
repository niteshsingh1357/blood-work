import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, fas } from '@fortawesome/free-solid-svg-icons';
import s from '../styles/Nav.module.scss';
import cx from 'classnames';
import { handleSignOut } from '../redux/actions/auth';
// import { fas } from '@fortawesome/free-brands-svg-icons';

library.add(fas, faUserCircle);

const NavbarComponent = ({ dispatch, sidebarToggle }) => {
  const [isOpen, setToggle] = useState(false);

  const toggleDropdown = () => {
    setToggle(!isOpen);
  };

  return (
    <Navbar className={s.root}>
      <Nav>
        <NavItem
          className={cx(
            'visible-xs mr-4 d-sm-up-none',
            s.headerIcon,
            s.sidebarToggler,
          )}
          href='#'
          onClick={sidebarToggle}
        >
          <i className='fa fa-bars fa-2x text-muted' />
        </NavItem>
        <NavItem>
          <InputGroup>
            <Input placeholder='Search for...' />
            <InputGroupAddon addonType='append' className='px-2'>
              <i className='fa fa-search' />
            </InputGroupAddon>
          </InputGroup>
        </NavItem>
      </Nav>
      <Nav className='ml-auto'>
        <Dropdown isOpen={isOpen} toggle={toggleDropdown}>
          <DropdownToggle nav>
            {/* <img
              className={cx('rounded-circle', s.adminPhoto)}
              src={''}
              alt=''
            /> */}
            <span className='text-body'>Administrator</span>
            <i
              className={cx('fa fa-angle-down', s.arrow, {
                [s.arrowActive]: isOpen,
              })}
            />
          </DropdownToggle>
          <DropdownMenu style={{ width: '100%' }}>
            <DropdownItem>
              <NavLink to='/profile'>Profile</NavLink>
            </DropdownItem>
            <DropdownItem onClick={() => {}}>Sign Out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
