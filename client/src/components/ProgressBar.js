import React, { useState, useEffect } from "react";
import { ProgressBar as ProgressBarBootstrap } from "react-bootstrap";
import "./ProgressBar.css";

const ProgressBar = ({ loading, label, srOnly = true }) => {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    loading === true && setCompleted(0);
    loading === false && setCompleted(100);
  }, [loading]);

  return (
    <ProgressBarBootstrap
      className="custom-progress-bar"
      now={completed}
      label={label}
      srOnly={srOnly}
    />
  );
};

export default ProgressBar;
