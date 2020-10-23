import React from "react";
import { Link } from "react-router-dom";

import { Breadcrumb as BreadcrumbBootstrap } from "react-bootstrap";
import "./Breadcrumb.css";

const Breadcrumb = ({ activePage, className = "" }) => {
  return (
    <BreadcrumbBootstrap className={`breadcrumb-custom ${className}`}>
      <BreadcrumbBootstrap.Item linkAs={Link} linkProps={{ to: "/" }}>
        Home
      </BreadcrumbBootstrap.Item>
      <BreadcrumbBootstrap.Item active>{activePage}</BreadcrumbBootstrap.Item>
    </BreadcrumbBootstrap>
  );
};

export default Breadcrumb;
