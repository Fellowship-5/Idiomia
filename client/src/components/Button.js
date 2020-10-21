import React from "react";
import { Button as ButtonBootstrap } from "react-bootstrap";
import Icon from "./Icon";
import './Button.css'

export default function Button({
  text,
  disabled = false,
  onClick = undefined,
  type = "button",
  icon,
  ...props
}) {
  return (
    <ButtonBootstrap
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...props}
    >
      {icon && <Icon icon={icon} />}
      <span>{text}</span>
    </ButtonBootstrap>
  );
}
