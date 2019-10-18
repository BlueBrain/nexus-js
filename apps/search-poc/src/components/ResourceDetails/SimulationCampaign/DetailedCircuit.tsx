
import React from 'react';
import { Collapse, Input, Button  } from 'antd';
import get from 'lodash/get';

import Copy from '../../Copy';
import { DetailedCircuitResource } from '../../../containers/ResourceDetails/types';
import { HandleClickParams } from '../../../types';

const { Panel } = Collapse;


const DetailedCircuit: React.FunctionComponent<{
  resource: DetailedCircuitResource;
  handleClick: (params: HandleClickParams) => void;
}> = props => {
  const { resource } = props;
  const brainRegion = get(resource, 'brainLocation', {}) as { label: string, id: string };

  return (
    <Collapse className="mt">
      <Panel
        className="panel--no-padding"
        header={`Circuit: ${resource.name}`}
        key="circuit"
      >
        <div className="p">
          <p>
            Name:
            <Button
              type="link"
              size="small"
              onClick={() => props.handleClick({ self: resource['@id'], type: 'resource' })}
            >
              {resource.name}
            </Button>
          </p>

          <p>
            Species: {resource.species.label ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={resource.species['@id']}
              >
                {resource.species.label}
              </a>
            ) : "NA"
            }
          </p>

          <p>
            Brain region: {brainRegion.label ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={brainRegion.id}
              >
                {brainRegion.label}
              </a>
            ) : "NA"
            }
          </p>

          <p>Description: {resource.description || 'NA'}</p>

          <Input
            className="mt"
            readOnly
            addonBefore="Base circuit path"
            addonAfter={
              <Copy
                textToCopy={resource.circuitBase.url}
                render={(copySuccess, triggerCopy) => (
                  <Button
                    block
                    type="link"
                    size="small"
                    icon="copy"
                    onClick={() => triggerCopy()}
                  >
                    {copySuccess ? 'Copied!' : 'Copy'}
                  </Button>
                )}
              />
            }
            defaultValue={resource.circuitBase.url}
          />
        </div>
      </Panel>
    </Collapse>
  );
};


export default DetailedCircuit;
