import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Navbar,
  NavbarBrand,
} from 'reactstrap';
import {ThemeContext} from '../App';

function NavbarNav(args) {
  const toggle = useContext(ThemeContext);
 

  return (
    <div className='mb-2'>
      <Navbar {...args} color={toggle.theme === 'dark' ? 'dark' : 'light'}>
        <Link to='/' className='link-style'>
          <NavbarBrand  className={toggle.theme === 'dark' ? 'text-white' : 'text-secondary'}>UsersPoint</NavbarBrand>
        </Link>
        <Button onClick={toggle.toggleTheme}>{toggle.theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</Button>
      </Navbar>
    </div>
  );
}

export default NavbarNav;