import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
export default function Icon({
  icon,
  onClick,
  name,
  id,
  fixedWidth,
  size,
  color,
  border,
  inverse
}) {

  return (
    <FontAwesomeIcon
      icon={icons[icon]}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
      id={id}
      mytype="my-type"
      name={name}
      size={size}
      border={border}
      color={color}
      fixedWidth={fixedWidth}
      inverse={inverse}
    />
  );
}
