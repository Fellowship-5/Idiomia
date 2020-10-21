import { faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Form as FormB } from "react-bootstrap";

const Checkbox = ({ id, ...props }) => {
  return (
    <FormB.Group id={id}>
      <FormB.Check type="checkbox" {...props} />
    </FormB.Group>
  );
};

export default Checkbox;
