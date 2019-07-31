import * as React from "react";

const Results: React.FunctionComponent<{
  items: string[];
  total: number;
}> = ({ items, total }) => {
  return (
    <div className="Results">
      <h3>{total}</h3>
      <ol>
        {items.map(id => (
          <li>{id}</li>
        ))}
      </ol>
    </div>
  );
};

export default Results;
