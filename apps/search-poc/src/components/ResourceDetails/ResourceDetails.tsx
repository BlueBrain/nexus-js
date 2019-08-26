import * as React from 'react';
import { Tag, Icon } from 'antd';

import './ResourceDetails.css';
import { camelCaseToLabelString } from '../../utils';

const ResourceDetails: React.FunctionComponent<{
  id: string;
  types: string[];
  name: string;
  description: string;
  brainRegion: {
    id: string;
    label: string;
  };
  layers: {
    id: string;
    label: string;
  }[];
  species: {
    id: string;
    label: string;
  };
  strain: {
    id: string;
    label: string;
  };
  uploadedAt: string;
  uploadedBy: string;
  className: string;
}> = props => {
  const NotFound = ({ label }: { label: string }) => {
    return (
      <p>
        <Icon type="warning" />
        This dataset does not have <b>{label}</b> information
      </p>
    );
  };
  return (
    <div className={`resource-details ${props.className}`}>
      <div className="metadata-container">
        <h1 className="name">{props.name}</h1>

        <h2>
          {props.types.map(type => (
            <em>{camelCaseToLabelString(type)}</em>
          ))}
        </h2>

        <p>
          uploaded {props.uploadedAt} by <b>{props.uploadedBy}</b>
        </p>

        <div className="brain-region">
          {props.brainRegion.label ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={props.brainRegion.id}
            >
              {props.brainRegion.label}
            </a>
          ) : (
            <NotFound label="Brain Region" />
          )}
        </div>

        {props.layers.length ? (
          <div className="layers-container">
            {props.layers.map(layer => (
              <Tag key={layer.id} color="blue">
                <a target="_blank" rel="noopener noreferrer" href={layer.id}>
                  {layer.label}
                </a>
              </Tag>
            ))}
          </div>
        ) : null}

        <p>
          {props.species.label ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={props.species.id}
            >
              {props.species.label}
            </a>
          ) : (
            <NotFound label="Species" />
          )}
        </p>

        <p>
          {props.strain.label ? (
            <a target="_blank" rel="noopener noreferrer" href={props.strain.id}>
              {props.strain.label}
            </a>
          ) : (
            <NotFound label="Strain" />
          )}
        </p>

        <p className="descripion">
          {props.description ? (
            props.description
          ) : (
            <NotFound label="description" />
          )}
        </p>
      </div>
      <div className="module-container">{props.children}</div>
    </div>
  );
};

export default ResourceDetails;
