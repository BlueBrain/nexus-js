import React from "react";
import style from "./search.css";
import Icon from "../../../img/search.svg";
import { Spinner } from "../index";

const SearchInputComponent = ({ inputRef, onKeyPress, status }) => (
  <div className={style["input-group"]}>
    <Icon className={style.icon} />
    <div className={`${style.fade} ${status === "pending" && style.in} ${style["spinner-holder"]}`}>
      <Spinner />
    </div>
    <input
      type="search"
      name="search"
      ref={inputRef}
      onKeyUp={onKeyPress}
      placeholder="Search..."
    />
  </div>
);

const SearchFormComponent = ({
  status,
  onSubmit,
  inputRef,
  className,
  onKeyPress,
  value,
  children
}) => (
  <div
    className={`${style.search} ${style[status]} ${className} ${value &&
      style.expanded}`}
  >
    <form onSubmit={onSubmit} autoComplete="off">
      <SearchInputComponent
        onKeyPress={onKeyPress}
        inputRef={inputRef}
        status={status}
      />
    </form>
    {children({ status, value, onSubmit })}
  </div>
);

export default SearchFormComponent;
