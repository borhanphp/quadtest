import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
} from 'reactstrap';

function NavbarNav(args) {

  return (
    <div className='mb-2'>
      <Navbar {...args} color='light'>
        <Link to='/' className='link-style'>
          <NavbarBrand>UsersPoint</NavbarBrand>
        </Link>
      </Navbar>
    </div>
  );
}

export default NavbarNav;