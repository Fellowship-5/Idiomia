import React from "react";
import { Link } from "react-router-dom";
import { Navbar as NavbarB, NavDropdown, Nav } from "react-bootstrap";
import "./Navbar.css";
const Navbar = () => {
  return (
    <NavbarB className="navbar-custom" bg="transparent" expand="lg">
      <NavbarB.Brand className="navbar-brand-text" as={Link} to="/">
        idiomia
      </NavbarB.Brand>
      <NavbarB.Toggle aria-controls="basic-navbarB-nav" />
      <NavbarB.Collapse id="basic-navbarB-nav">
        <Nav className="ml-auto">
          <NavDropdown
            className="navbar-dropdown"
            title="HOME"
            id="navbar-dropdown"
          >
            <NavDropdown.Item as={Link} to="/">
              About
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/">
              Faqs
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/">
              Contact
            </NavDropdown.Item>
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
          <Nav.Link as={Link} className="navbar-link" to="/">
            ABOUT
          </Nav.Link>
          <Nav.Link as={Link} className="navbar-link" to="/">
            FAQS
          </Nav.Link>
          <Nav.Link as={Link} className="navbar-link" to="/">
            CONTACT
          </Nav.Link>

          <Nav.Link className="navbar-link" as={Link} to="/login">
            Login
          </Nav.Link>
          <Nav.Link className="navbar-link" as={Link} to="/register">
            Register
          </Nav.Link>
        </Nav>
      </NavbarB.Collapse>
    </NavbarB>
  );
};

export default Navbar;
