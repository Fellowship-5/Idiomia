import React from "react";
import { Link } from "react-router-dom";
import { Navbar as NavbarBootstrap, NavDropdown, Nav } from "react-bootstrap";
import { useAuth } from "./../../redux/hooks";
import NavbarLink from './../../components/NavbarLink'

import "./Navbar.css";


const Navbar = () => {
  const { isAuthenticated, logoutUser, user } = useAuth();
  const links = [
    { className: "navbar-link", to: "/login", title: "Login", isAuth: false },
    {
      className: "navbar-link",
      to: "/register",
      title: "Register",
      isAuth: false,
    },
    {
      className: "navbar-link",
      to: "/dashboard",
      title: "Dashboard",
      isAuth: true,
    },
  ];
  const dropdownLinks = [
    { className: "dropdown-item", to: "/login", title: "Login", isAuth: false },
    {
      className: "dropdown-item",
      to: "/register",
      title: "Register",
      isAuth: false,
    },
    {
      className: "dropdown-item",
      to: "/dashboard",
      title: "Dashboard",
      isAuth: true,
    },
    {
      className: "dropdown-item",
      to: "/",
      title: "Logout",
      isAuth: true,
      onClick: logoutUser,
    },
  ];

  return (
    <NavbarBootstrap className="navbar-custom" bg="transparent" expand="lg">
      <NavbarBootstrap.Brand className="navbar-brand-text" as={Link} to="/">
        idiomia
      </NavbarBootstrap.Brand>
      <NavbarBootstrap.Toggle aria-controls="basic-navbarB-nav" />
      <NavbarBootstrap.Collapse id="basic-navbarB-nav">
        <Nav className="ml-auto">
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
            })}
          </NavDropdown>

          {links.map((link, i) => {
            if (link.isAuth === isAuthenticated) {
              return (
                <NavbarLink
                  key={i}
                  to={link.to}
                  className={link.className}
                  title={link.title}
                />
              );
            }
          })}
        </Nav>
      </NavbarBootstrap.Collapse>
    </NavbarBootstrap>
  );
};

export default Navbar;
