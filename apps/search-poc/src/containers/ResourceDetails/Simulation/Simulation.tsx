
import React from 'react';
import get from 'lodash/get';

import { SimulationResource } from '../types';
import { HandleClickParams } from '../../../types';

import BasicInfoContainer from './BasicInfo';
import AnalysisContainer from './Analysis';
import SlurmInfoContainer from './SlurmInfo';


const SimulationCampaignContainer: React.FunctionComponent<{
  resource: SimulationResource;
  handleClick: (params: HandleClickParams) => void;
}> = props => {

  const generated = get(props.resource, 'generated.@id')

  return (
    <div>
      <BasicInfoContainer
        resource={props.resource}
        handleClick={props.handleClick}
      />
      {generated && <AnalysisContainer
        resource={props.resource}
        handleClick={props.handleClick}
      />}
      <SlurmInfoContainer
        resource={props.resource}
        handleClick={props.handleClick}
      />
    </div>
  )
}


export default SimulationCampaignContainer;
