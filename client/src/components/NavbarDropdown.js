import React from "react";
import { NavDropdown } from "react-bootstrap";
import NavbarLink from "./NavbarLink";

const NavbarDropdown = ({ isAuthenticated, user, dropdownLinks }) => {
  return (
    <NavDropdown
      className="navbar-dropdown"
      title={isAuthenticated && user ? `${user.name}` : "Home"}
      id="navbar-dropdown"
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
          );
        }
        return null;
      })}
    </NavDropdown>
  );
};

export default NavbarDropdown;
