import React from "react";
import style from "./login.css";

const LoginComponent = ({ className, name, loginURI, logout }) => (
  <div className={`login ${className} ${style.login}`}>
    {name ? (
      <p>
        <span>{name}</span> (<a onClick={logout}>logout</a>)
      </p>
    ) : (
      <a href={loginURI}>login</a>
    )}
  </div>
);

export default LoginComponent;
