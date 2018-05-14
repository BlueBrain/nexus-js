import React from "react";
import FontAwesome from "react-fontawesome";
import CopyToClipboard from "../CopyToClipboard/index.jsx";
import style from "./instance.css";
import Type from "../Shapes/Type";

const Revision = rev => (
  <span style={{ float: "right", lineHeight: "2.25em" }}>
    <span>revision</span> <span>{rev}</span>
  </span>
);

const Name = instance => {
  let name =
    instance["skos:prefLabel"] ||
    instance["rdfs:label"] ||
    instance["schema:name"] ||
    instance["name"];
  let id = instance["@id"];
  if (!name) {
    let split = id.split("-");
    name = "..." + split[split.length - 1];
  }
  return (
    <div className="name">
      {name} <CopyToClipboard value={id} text="copy identifier" />
    </div>
  );
};

const Deprecated = deprecated => (
  <div className="deprecated">
    {deprecated ? (
      <small style={{ color: "#ff666680" }}>
        <FontAwesome name="exclamation" /> Deprecated
      </small>
    ) : null}
  </div>
);

const Header = instance => (
  <div className="instance-header">
    <div className="instance-link right">
      <CopyToClipboard
        value={location.href}
        icon="link"
        text="copy shareable link"
      />
    </div>
    <h1>{Name(instance)}</h1>
    <div className={style.instance}>
      {Revision(instance["nxv:rev"])}
      <Type type={instance["@type"]} />
      {Deprecated(instance["nxv:deprecated"])}
    </div>
  </div>
);
export default Header;
