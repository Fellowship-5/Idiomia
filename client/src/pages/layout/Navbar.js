import React from "react";
import { Link } from "react-router-dom";
import { Navbar as NavbarBootstrap, NavDropdown, Nav } from "react-bootstrap";
import { useAuth } from "./../../redux/hooks";

import "./Navbar.css";
const Navbar = () => {
  const { isAuthenticated, logoutUser, user } = useAuth();

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
            {!isAuthenticated && (
              <>
                <NavDropdown.Item as={Link} to="/login">
                  Login
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/register">
                  Register
                </NavDropdown.Item>
              </>
            )}

            {isAuthenticated && (
              <>
                <NavDropdown.Item
                  as={Link}
                  to="/dashboard"
                  onClick={() => logoutUser()}
                >
                  Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/" onClick={() => logoutUser()}>
                  Logout
                </NavDropdown.Item>
              </>
            )}
          </NavDropdown>

          {!isAuthenticated && (
            <>
              <Nav.Link className="navbar-link" as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link className="navbar-link" as={Link} to="/register">
                Register
              </Nav.Link>
            </>
          )}
          {isAuthenticated && (
            <Nav.Link className="navbar-link" as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
          )}
        </Nav>
      </NavbarBootstrap.Collapse>
    </NavbarBootstrap>
  );
};

export default Navbar;
