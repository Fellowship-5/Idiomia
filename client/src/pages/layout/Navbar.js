import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth, useSearch } from "./../../redux/hooks";
import NavbarComponent from "./../../components/Navbar";
import IdiomiaLogo from "./../../images/idiomia-11.png";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { isAuthenticated, logoutUser, user } = useAuth();
  const { setSearchIconClicked, isButtonClicked } = useSearch();
  const history = useHistory();
  const isAdminRole = user?.role === "admin";
  const { t } = useTranslation(["homePage", "user", "auth"]);
  const handleSearchClick = (e) => {
    e.preventDefault();
    history.push("/");
    setSearchIconClicked(!isButtonClicked);
  };
  const links = [
    {
      className: "navbar-link",
      to: "/about",
      title: t("about"),
      isAuth: "all",
    },
    {
      className: "navbar-link",
      to: "/login",
      title: t("login"),
      isAuth: false,
    },
    {
      className: "navbar-link",
      to: "/register",
      title: t("register"),
      isAuth: false,
    },
    {
      className: isAdminRole ? "navbar-link" : "d-none",
      to: isAdminRole ? "/admin-dashboard" : "",
      title: isAdminRole && t("ADMIN"),
      isAuth: true,
    },
    {
      className: "navbar-link",
      to: "/dashboard",
      title: t("DASHBOARD"),
      isAuth: true,
    },
    {
      className: "navbar-link",
      to: "#",
      title: t("Search"),
      isAuth: "all",
      onClick: handleSearchClick,
    },
    {
      className: "navbar-link",
      to: "/",
      title: t("logout"),
      isAuth: true,
      onClick: logoutUser,
    },
  ];
  const dropdownLinks = [
    {
      className: "dropdown-item",
      to: "/login",
      title: t("login"),
      isAuth: false,
    },
    {
      className: "dropdown-item",
      to: "/register",
      title: t("register"),
      isAuth: false,
    },
    {
      className: "navbar-link",
      to: "/dashboard",
      title: t("DASHBOARD"),
      isAuth: true,
    },
    {
      className: isAdminRole ? "navbar-link" : "d-none",
      to: isAdminRole ? "/admin-dashboard" : "",
      title: isAdminRole && t("ADMIN"),
      isAuth: true,
    },
    {
      className: "dropdown-item",
      to: "/",
      title: t("logout"),
      isAuth: true,
      onClick: logoutUser,
    },
  ];

  return (
    <NavbarComponent
      brandLogo={IdiomiaLogo}
      isAuthenticated={isAuthenticated}
      user={user}
      links={links}
      dropdownLinks={dropdownLinks}
    />
  );
};

export default Navbar;
