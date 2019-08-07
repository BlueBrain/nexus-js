import * as React from 'react';
import { Link } from 'react-router-dom';

const Results: React.FunctionComponent<{
  items: string[];
  total: number;
}> = ({ items, total }) => {
  return (
    <div className="Results">
      <h3>{total}</h3>
      <ol>
        {items.map(url => (
          <li>
            <Link to={`resources?self=${url}`}>{url}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Results;
