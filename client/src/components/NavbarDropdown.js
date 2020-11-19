import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import NavbarLink from './NavbarLink'
import { useTranslation } from 'react-i18next'

const NavbarDropdown = ({ isAuthenticated, user, dropdownLinks }) => {
  const { t } = useTranslation('homePage')
  return (
    <NavDropdown
      className='navbar-dropdown'
      title={isAuthenticated && user ? `${user.name}` : t('Home')}
      id='navbar-dropdown'
    >
      {dropdownLinks.map((link, i) => {
        if (link.isAuth === isAuthenticated) {
          return (
            <NavbarLink
              key={i}
              to={link.to}
              className={link.className}
              title={link.title}
              onClick={link?.onClick}
            />
          )
        }
        return null
      })}
    </NavDropdown>
  )
}

export default NavbarDropdown
