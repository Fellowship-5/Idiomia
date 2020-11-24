import React from "react";
import { Badge as BadgeBoostrap } from "react-bootstrap";

const Badge = ({ variant, text, label, labelClassName = "", ...props }) => {
  console.log(text);
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className={`d-flex align-items-center ${labelClassName}`}>
        {label}
        <BadgeBoostrap variant={variant} {...props}>
          {text}
        </BadgeBoostrap>
      </div>
    </div>
  );
};

export default Badge;
