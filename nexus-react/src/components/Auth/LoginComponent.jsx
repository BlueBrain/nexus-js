import React from "react";
import style from "./login.css";

const LoginComponent = ({ className, name, loginURI, logout }) => (
  <div
    className={`login ${className || ""} ${style.login}`}
    onClick={name ? logout : () => (window.location = loginURI)}
  >
    {name ? (
      <React.Fragment>
        <span>{name}</span> (<a>logout</a>)
      </React.Fragment>
    ) : (
      <a href={loginURI}>login</a>
    )}
  </div>
);

export default LoginComponent;
