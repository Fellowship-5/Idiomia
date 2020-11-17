import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavbarLink = ({ title, ...props }) => {
  return (
    <Nav.Link as={Link} {...props}>
      {title}
    </Nav.Link>
  )
}

export default NavbarLink
