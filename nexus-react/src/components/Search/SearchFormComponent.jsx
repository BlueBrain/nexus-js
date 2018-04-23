import React from "react";
import style from "./search.css";
import Icon from '../../../img/magGlass.svg';

const SearchInputComponent = ({ inputRef, onKeyPress }) => (
  <div className={style["input-group"]}>
    {/* <label htmlFor="search">Search Instances</label> */}
    <Icon className={style.icon}/>
    <input type="search" name="search" ref={inputRef} onKeyUp={onKeyPress} placeholder="Search..."/>
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
  <div className={`${style.search} ${style[status]} ${className} ${value && style.expanded}`}>
    <form
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <SearchInputComponent onKeyPress={onKeyPress} inputRef={inputRef} />
    </form>
    {children({ status, value })}
  </div>
);

export default SearchFormComponent;
