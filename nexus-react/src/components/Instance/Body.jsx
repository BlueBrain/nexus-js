import React from "react";
import { Distribution, Properties } from "../Shapes";

const Body = instance => {
  return (
    <div className="instance-content container">
      <ul>
        {instance.distribution && (
          <li>{Distribution(instance.distribution)}</li>
        )}
        <Properties instance={instance} />
      </ul>
    </div>
  );
};

export default Body;
