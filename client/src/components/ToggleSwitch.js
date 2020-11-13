import React, { useRef, useEffect } from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = ({
  value,
  label,
  setToggle,
  defaultOption,
  firstOption,
  secondOption,
}) => {
  const switchRef = useRef(null);

  const addClass = (name) => (switchRef.current.className = name);

  useEffect(function setToggleDefaultValue() {
    return () => {
      addClass("dot move-left");
      setToggle({ label: defaultOption, value: 0 });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLeftClick = (e) => {
    switch (value) {
      case 1:
        addClass("dot move-left");
        setToggle({ label: defaultOption, value: 0 });
        break;
      case 2:
        addClass("dot move-center");
        setToggle({ label: firstOption, value: 1 });
        break;
      default:
        break;
    }
  };

  const handleMiddleClick = (e) => {
    addClass("dot move-center");
    setToggle({ label: firstOption, value: 1 });
  };

  const handleRightClick = (e) => {
    switch (value) {
      case 0:
        addClass("dot move-center");
        setToggle({ label: firstOption, value: 1 });
        break;
      case 1:
        addClass("dot move-right");
        setToggle({ label: secondOption, value: 2 });
        break;
      default:
        break;
    }
  };
  return (
    <div>
      {label}
      <div className="custom-toggle-switch">
        <div className="segment left" onClick={handleLeftClick}></div>
        <div className="segment middle" onClick={handleMiddleClick}></div>
        <div className="segment right" onClick={handleRightClick}></div>
        <div className="dot" ref={switchRef}></div>
      </div>
    </div>
  );
};

export default ToggleSwitch;
