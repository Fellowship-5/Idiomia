import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function Input({
  plaintext = false,
  disabled = false,
  required = false,
  readOnly = false,
  pClassName,
  label,
  controlId,
  children,
  error,
  inputTextLeft,
  inputTextRight,
  inputTextRightOnClick,
  ...props
}) {
  return (
    <Form.Group className={pClassName} controlId={controlId}>
      <Form.Label>
        {label}
        {error}
      </Form.Label>
      <InputGroup>
        <InputGroup.Prepend>
          {inputTextLeft && (
            <InputGroup.Text className="py-0">{inputTextLeft}</InputGroup.Text>
          )}
        </InputGroup.Prepend>
        <Form.Control
          required={required}
          disabled={disabled}
          plaintext={plaintext}
          {...props}
        >
          {children}
        </Form.Control>
        <InputGroup.Prepend onClick={inputTextRightOnClick}>
          {inputTextRight && (
            <InputGroup.Text className="py-0">{inputTextRight}</InputGroup.Text>
          )}
        </InputGroup.Prepend>
      </InputGroup>
    </Form.Group>
  );
}
