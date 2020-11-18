import React from "react";
import { useAuth } from "./../../redux/hooks";
import NavbarComponent from "./../../components/Navbar";

const Navbar = () => {
  const { isAuthenticated, logoutUser, user } = useAuth();
  const isAdminRole = user?.role === "admin";
  const links = [
    {
      className: "navbar-link",
      to: "/about",
      title: "About",
      isAuth: false,
    },
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
      title: "DASHBOARD",
      isAuth: true,
    },
    {
      className: "navbar-link",
      to: isAdminRole && "/admin-dashboard",
      title: isAdminRole && "ADMIN",
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
      className: "navbar-link",
      to: "/dashboard",
      title: "DASHBOARD",
      isAuth: true,
    },
    {
      className: "navbar-link",
      to: isAdminRole && "/admin-dashboard",
      title: isAdminRole && "ADMIN",
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
    <NavbarComponent
      brandTitle="idiomia"
      isAuthenticated={isAuthenticated}
      user={user}
      links={links}
      dropdownLinks={dropdownLinks}
    />
  );
};

export default Navbar;
