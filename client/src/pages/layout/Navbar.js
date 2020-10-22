import React from "react";
import { Link } from "react-router-dom";
import { Navbar as NavbarBootstrap, NavDropdown, Nav } from "react-bootstrap";
import "./Navbar.css";
const Navbar = () => {
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
            title="HOME"
            id="navbar-dropdown"
          >
            <NavDropdown.Item as={Link} to="/login">
              Login
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/register">
              Register
            </NavDropdown.Item>

            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/">
              Logout
            </NavDropdown.Item>
          </NavDropdown>

          <Nav.Link className="navbar-link" as={Link} to="/login">
            Login
          </Nav.Link>
          <Nav.Link className="navbar-link" as={Link} to="/register">
            Register
          </Nav.Link>
        </Nav>
      </NavbarBootstrap.Collapse>
    </NavbarBootstrap>
  );
};

export default Navbar;
