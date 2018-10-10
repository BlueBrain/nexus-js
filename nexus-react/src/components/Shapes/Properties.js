import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Relationship from "./Relationship";
import Property from "./Property";
import { guidGenerator } from "../../libs/utils";

const isDate = dateToTest =>
  moment(dateToTest, moment.ISO_8601, true).isValid();

export const Properties = ({ instance, goToEntityByID }) => {
  const metaFields = [
    "distribution",
    "@id",
    "@context",
    "@type",
    "nxv:deprecated",
    "nxv:rev",
    "links",
  ];

  return Object.keys(instance).map(key => {
    let value = instance[key];
    // dont process metaFields
    if (metaFields && metaFields.indexOf(key) >= 0) {
      return;
    }
    return mapToPropertyComponent(key, value, goToEntityByID);
  });
};

Properties.propTypes = {
  instance: PropTypes.any.isRequired
};

export const mapToPropertyComponent = (key, value, goToEntityByID) => {
  const reactID = guidGenerator();
  if (value.value) {
    return (
      <Property key={reactID} type="measurement" name={key} value={value} goToEntityByID={goToEntityByID}/>
    );
  }
  if (isDate(value)) {
    return <Property key={reactID} type="date" name={key} value={value} goToEntityByID={goToEntityByID}/>;
  }
  if (Array.isArray(value)) {
    if (value.length === 1 && value[0]["@id"]) {
      return <Relationship key={reactID} name={key} value={value[0]} goToEntityByID={goToEntityByID} />;
    } else {
      return <Property key={reactID} type="list" name={key} value={value} goToEntityByID={goToEntityByID} />;
    }
  }
  if (typeof value === "object") {
    if (value["@id"]) {
      return <Relationship key={reactID} name={key} value={value} goToEntityByID={goToEntityByID} />;
    }
    return <Property key={reactID} type="object" name={key} value={value} goToEntityByID={goToEntityByID}/>;
  }
  if (typeof value === "string") {
    return <Property key={reactID} type="string" name={key} value={value} goToEntityByID={goToEntityByID}/>;
  }
};
