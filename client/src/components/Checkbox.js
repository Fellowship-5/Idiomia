import { faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Form as FormBootstrap } from "react-bootstrap";
import "./Checkbox.css";

const Checkbox = ({ id, pClassName, ...props }) => {
  return (
    <FormBootstrap.Group id={id} className={pClassName}>
      <FormBootstrap.Check type="checkbox" {...props} />
    </FormBootstrap.Group>
  );
};

export default Checkbox;
