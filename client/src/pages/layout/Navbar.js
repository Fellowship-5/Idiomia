import React from 'react'
import { useAuth } from './../../redux/hooks'
import NavbarComponent from './../../components/Navbar'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
  const { t, i18n } = useTranslation('homePage')
  const { isAuthenticated, logoutUser, user } = useAuth()

  const links = [
    {
      className: 'navbar-link',
      to: '/about',
      title: t('about'),
      isAuth: false
    },
    {
      className: 'navbar-link',
      to: '/login',
      title: t('login'),
      isAuth: false
    },
    {
      className: 'navbar-link',
      to: '/register',
      title: t('register'),
      isAuth: false
    },
    {
      className: 'navbar-link',
      to: '/dashboard',
      title: t('dashboard'),
      isAuth: true
    }
  ]

  const dropdownLinks = [
    {
      className: 'dropdown-item',
      to: '/login',
      title: t('login'),
      isAuth: false
    },
    {
      className: 'dropdown-item',
      to: '/register',
      title: t('register'),
      isAuth: false
    },
    {
      className: 'dropdown-item',
      to: '/dashboard',
      title: t('dashboard'),
      isAuth: true
    },
    {
      className: 'dropdown-item',
      to: '/',
      title: t('logout'),
      isAuth: true,
      onClick: logoutUser
    }
  ]

  return (
    <NavbarComponent
      brandTitle='idiomia'
      isAuthenticated={isAuthenticated}
      user={user}
      links={links}
      dropdownLinks={dropdownLinks}
    />
  )
}

export default Navbar
