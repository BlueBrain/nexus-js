import React from "react";
import { Distribution, Properties } from "../Shapes";

const Body = (instance, goToEntityByID) => {
  return (
    <div className="instance-content container">
        {instance.distribution && Distribution(instance.distribution)}
        <Properties instance={instance} goToEntityByID={goToEntityByID} />
    </div>
  );
};

export default Body;
