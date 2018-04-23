import React from "react";
import style from "./search.css";

// TODO provide href thing
export const SearchForComponent = ({ value, href, onSubmit }) => (
  <a href={href} onClick={onSubmit} className={style["search-value-indicator"]}>
    Search for "{value}"
  </a>
);

export const SearchResultsDropdown = () => {};