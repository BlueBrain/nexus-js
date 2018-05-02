import React from "react";
import style from "./search.css";

// TODO provide href thing
export const SearchForComponent = ({ className, value, href, onSubmit }) => (
  <a href={href} onClick={onSubmit} className={`search-for ${className || ""} ${style["search-value-indicator"]} ${style["nudge-on-hover"]}`}>
    <span>Search for "{value}"</span>
  </a>
);

export const SearchResultsDropdown = () => {};