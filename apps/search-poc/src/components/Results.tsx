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
            <Link
              // double URI encoding because otherwise
              // our selfURLS with encoded URLs as the resourceID path
              // will become decoded as well, leading to 404
              // for example
              // https://staging.nexus.ocp.bbp.epfl.ch/v1/resources/bbp/nmc/datashapes:dataset/https%3A%2F%2Fbbp.epfl.ch%2Fneurosciencegraph%2Fdata%2Freconstructedcell%2Ffef76d7c-8175-4874-8566-8938928a030f
              to={`resources/${encodeURIComponent(encodeURIComponent(url))}`}
            >
              {url}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Results;
