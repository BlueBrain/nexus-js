import * as React from 'react';
import './ResourceDetails.css';
import { Tag } from 'antd';

const ResourceDetails: React.FunctionComponent<{
  id: string;
  name: string;
  types: string[];
  description: string;
}> = props => {
  return (
    <div className="resource-details">
      <div className="metadata-container">
        <h1 className="name">{props.name}</h1>
        <ul>
          {props.types.map(type => (
            <Tag>{type}</Tag>
          ))}
        </ul>
        <p className="descripion">{props.description}</p>
      </div>
      <div className="module-container">{props.children}</div>
    </div>
  );
};

export default ResourceDetails;
