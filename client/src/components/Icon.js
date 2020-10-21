import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";

export default function Icon({ icon, ...props }) {
  return (
    <FontAwesomeIcon
      icon={icons[icon]}
      style={{ cursor: "pointer" }}
      {...props}
    />
  );
}
