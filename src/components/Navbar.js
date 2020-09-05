import React from 'react';
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarComponent = ({ signOut }) => {
  return (
    <Navbar collapseOnSelect id='navbar' expand={('lg', 'md')} sticky='top'>
      <Link to='/'>
        <Navbar.Brand id='logo'>BloodWork</Navbar.Brand>
      </Link>
      <Navbar.Toggle
        aria-controls='responsive-navbar-nav'
        className='custom-toggler'
      />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='#home'>Home</Nav.Link>
          <Nav.Link href='#donor-list'>Donor List</Nav.Link>
          <Nav.Link href='#blood-requests'>Blood Requests</Nav.Link>
        </Nav>
        <NavDropdown title='User' id='responsive-nav-dropdown'>
          <NavDropdown.Item href='#profile'>Profile</NavDropdown.Item>
          <NavDropdown.Item href='#settings'>Settings</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={signOut}>Sign Out</NavDropdown.Item>
        </NavDropdown>

        <span className=' d-none d-md-block d-lg-block'>
          <Image
            aria-controls='responsive-navbar-nav'
            src='holder.js/171x180'
            roundedCircle
          />
        </span>
        {/* <Form inline>
          <FormControl type='text' placeholder='Search' className='mr-sm-2' />
          <Button variant='outline-success'>Search</Button>
        </Form> */}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
