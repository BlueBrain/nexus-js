import React from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import FontAwesome from "react-fontawesome";
import { guidGenerator } from "../../libs/utils";

// for parsing type stings like nsg:StimulusExperiment into object with category, name
const parseType = type => {
  if (!type || typeof type !== "string") {
    return null;
  }
  return {
    category: type.split(":")[0],
    name: type.split(":")[1]
  };
};

// make a comma seperated name from types
const typeName = type => {
  if (!type) {
    return "Empty";
  }
  if (typeof type === "string") {
    return parseType(type).name;
  }
  const title = type.map(val => parseType(val).name).join(", ");
  return title;
};

const Type = ({ type }) => {
  const id = guidGenerator();
  return (
    <React.Fragment>
      <ReactTooltip id={id} className="small-tooltip" effect="solid" />
      <div className="type pill" data-for={id} data-tip={"type of instance"}>
        <FontAwesome name="tags" /> {typeName(type)}
      </div>
    </React.Fragment>
  );
};

Type.propTypes = {
  type: PropTypes.any.isRequired
};

export default Type;
