import * as React from 'react';
import './ResourceDetails.css';

const ResourceDetails: React.FunctionComponent<{
  id: string;
  name: string;
  description: string;
  brainRegion: {
    id: string;
    label: string;
  };
}> = props => {
  return (
    <div className="resource-details">
      <div className="metadata-container">
        <h1 className="name">{props.name}</h1>
        <p className="descripion">{props.description}</p>
      </div>
      <div className="module-container">{props.children}</div>
    </div>
  );
};

export default ResourceDetails;
