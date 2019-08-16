
import * as React from 'react';
import { Tag } from 'antd';

import './ResourceDetails.css';


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
  }
}> = props => {
  return (
    <div className="ResourceDetails">
      <div className="metadata-container">
        <h1 className="name">{props.name}</h1>

        <h3>
          Type: &nbsp;
          {props.types.map(type =>
            <Tag key={type}>{type}</Tag>
          )}
        </h3>

        <p>
          Brain region: &nbsp;
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={props.brainRegion.id}
          >
            {props.brainRegion.label}
          </a>
        </p>

        <p>
          Species: &nbsp;
          {props.species.label
            ? <a
              target="_blank"
              rel="noopener noreferrer"
              href={props.species.id}
            >
              {props.species.label}
            </a>
            : 'NA'
          }
        </p>

        <p>
          Strain: &nbsp;
          {props.strain.label
            ? <a
              target="_blank"
              rel="noopener noreferrer"
              href={props.strain.id}
            >
              {props.strain.label}
            </a>
            : 'NA'
          }
        </p>

        {props.layers.length
          ? <div className="layers-container">
            Layers: &nbsp;
            {props.layers.map(layer =>
              <Tag key={layer.id} color="blue">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={layer.id}
                >
                  {layer.label}
                </a>
              </Tag>
            )}
          </div>
          : null
        }

        <p className="descripion">
          Description: {props.description}
        </p>
      </div>
      <div className="module-container">{props.children}</div>
    </div>
  );
};

export default ResourceDetails;
