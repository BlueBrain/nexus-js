import * as React from 'react';

const ResourceDetails: React.FunctionComponent<{
  id: string;
  name: string;
  description: string;
}> = props => {
  return (
    <div className="ResourceDetails">
      <div className="metadata-container">
        <h1 className="name">{props.name}</h1>
        <p className="descripion">{props.description}</p>
      </div>
      <div className="module-container">{props.children}</div>
    </div>
  );
};

export default ResourceDetails;