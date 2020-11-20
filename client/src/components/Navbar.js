import React from "react";
import { Link } from "react-router-dom";
import { Navbar as NavbarBootstrap, Nav } from "react-bootstrap";
import NavbarLink from "./NavbarLink";
import NavbarDropdown from "./NavbarDropdown";
import ChangeLang from "../components/ChangeLang";
import "./Navbar.css";

const NavbarComponent = ({
  brandLogo,
  isAuthenticated,
  user,
  links,
  dropdownLinks,
}) => {
  return (
    <NavbarBootstrap className="navbar-custom" bg="transparent" expand="lg">
      <NavbarBootstrap.Brand className="navbar-brand-logo" as={Link} to="/">
        <img src={brandLogo} className="navbar-logo" alt="idomia-logo" />
      </NavbarBootstrap.Brand>

      <div className="d-flex flex-row-reverse">
        <NavbarBootstrap.Toggle aria-controls="basic-navbarB-nav" />
        <NavbarDropdown
          isAuthenticated={isAuthenticated}
          user={user}
          dropdownLinks={dropdownLinks}
        />
      </div>
      <NavbarBootstrap.Collapse id="basic-navbarB-nav">
        <Nav className="ml-auto">
          {links.map((link, i) => {
            if (link.isAuth === isAuthenticated || link.isAuth === "all") {
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
          <ChangeLang />
        </Nav>
      </NavbarBootstrap.Collapse>
    </NavbarBootstrap>
  );
};

export default NavbarComponent;
