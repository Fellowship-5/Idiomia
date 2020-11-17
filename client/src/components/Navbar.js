import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar as NavbarBootstrap, Nav } from 'react-bootstrap'
import NavbarLink from './NavbarLink'
import NavbarDropdown from './NavbarDropdown'
import ChangeLang from '../components/ChangeLang'
import './Navbar.css'

const NavbarComponent = ({
  brandTitle,
  isAuthenticated,
  user,
  links,
  dropdownLinks
}) => {
  return (
    <NavbarBootstrap className='navbar-custom' bg='transparent' expand='lg'>
      <NavbarBootstrap.Brand className='navbar-brand-text' as={Link} to='/'>
        {brandTitle}
      </NavbarBootstrap.Brand>
      <NavbarBootstrap.Toggle aria-controls='basic-navbarB-nav' />
      <NavbarBootstrap.Collapse id='basic-navbarB-nav'>
        <Nav className='ml-auto'>
          <NavbarDropdown
            isAuthenticated={isAuthenticated}
            user={user}
            dropdownLinks={dropdownLinks}
          />

          {links.map((link, i) => {
            if (link.isAuth === isAuthenticated) {
              return (
                <NavbarLink
                  key={i}
                  to={link.to}
                  className={link.className}
                  title={link.title}
                />
              )
            }
          })}
          <ChangeLang />
        </Nav>
      </NavbarBootstrap.Collapse>
    </NavbarBootstrap>
  )
}

export default NavbarComponent
