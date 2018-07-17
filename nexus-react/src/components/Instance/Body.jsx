import React from "react";
import { Distribution, Properties } from "../Shapes";

const Body = (instance, goToEntityByID) => {
  return (
    <div className="instance-content container">
      <ul>
        {instance.distribution && (
          <li>{Distribution(instance.distribution)}</li>
        )}
        <Properties instance={instance} goToEntityByID={goToEntityByID} />
      </ul>
    </div>
  );
};

export default Body;
