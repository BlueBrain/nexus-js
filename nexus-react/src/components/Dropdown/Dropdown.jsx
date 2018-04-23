import React from "react";
import style from "./dropdown.css";

const DropdownComponent = ({ children, down, className }) => {
  let dropdownClass = down
    ? `dropdown ${className} ${style.dropdown} ${style.down}`
    : `dropdown ${className} ${style.dropdown}`
  return <div className={dropdownClass}>{children}</div>;
};

export default DropdownComponent;
