import { faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Form as FormB } from "react-bootstrap";

const Checkbox = ({ label, id, onChange, checked, name }) => {
  return (
    <FormB.Group id={id}>
      <FormB.Check
        type="checkbox"
        onChange={onChange}
        checked={checked}
        label={label}
        name={name}
      />
    </FormB.Group>
  );
};

export default Checkbox;
