
import React from 'react';

import { SimulationCampaignResource } from '../types';
import { HandleClickParams } from '../../../types';

import BasicInfoContainer from './BasicInfo';
import SimulationListContainer from './SimulationList';
import DetailedCircuitContainer from './DetailedCircuit';
import SimWriterConfigContainer from './SimWriterConfig';


const SimulationCampaignContainer: React.FunctionComponent<{
  resource: SimulationCampaignResource;
  handleClick: (params: HandleClickParams) => void;
}> = props => {
  const circuitEntry = (props.resource.used || [])
    .find(entry => entry['@type'] === 'DetailedCircuit');

  const circuitId = circuitEntry && circuitEntry['@id'];

  const simWriterConfigEntry = (props.resource.used || [])
    .find(entry => entry['@type'] === 'SimWriterConfiguration');

  const simWriterConfigId = simWriterConfigEntry && simWriterConfigEntry['@id'];

  return (
    <div>
      <BasicInfoContainer
        resource={props.resource}
        handleClick={props.handleClick}
      />
      <SimulationListContainer
        resource={props.resource}
        handleClick={props.handleClick}
      />
      {simWriterConfigId &&
        <SimWriterConfigContainer
          resourceId={simWriterConfigId}
          handleClick={props.handleClick}
        />
      }
      {circuitId &&
        <DetailedCircuitContainer
          resourceId={circuitId}
          handleClick={props.handleClick}
        />
      }
    </div>
  )
}


export default SimulationCampaignContainer;
