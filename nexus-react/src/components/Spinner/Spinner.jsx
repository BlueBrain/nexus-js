import React from "react";
import style from "./spinner.css";

// TODO provide href thing
const Spinner = ({ className }) => (
  <svg
    className={`spinner ${style.spinner} ${className || ""}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      fill="none"
      strokeWidth="10%"
      strokeLinecap="round"
      cx="50%"
      cy="50%"
      r="40%"
    />
  </svg>
);

export default Spinner;
