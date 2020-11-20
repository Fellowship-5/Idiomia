import React from "react";
import Icon from "./Icon";
import { NavDropdown } from "react-bootstrap";
import i18n from "i18next";

const ChangeLang = () => {
  const languages = [
    { title: "Eng", code: "en" },
    { title: "عربي", code: "ar" },
  ];
  const handleLang = (lang) => {
    i18n.changeLanguage(lang);
  };
  return (
    <NavDropdown
      className="navbar-dropdown"
      title={<Icon size="2x" icon="faLanguage" />}
    >
      {languages.map((lang, i) => (
        <button
          className="dropdown-item"
          key={"translation" + i}
          onClick={() => {
            handleLang(lang.code);
          }}
        >
          {lang.title}
        </button>
      ))}
    </NavDropdown>
  );
};

export default ChangeLang;
