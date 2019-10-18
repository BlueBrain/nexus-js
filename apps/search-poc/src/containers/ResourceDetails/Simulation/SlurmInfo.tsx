
import React from 'react';

import { SimulationResource } from '../types';
import { HandleClickParams } from '../../../types';
import SlurmInfo from '../../../components/ResourceDetails/Simulation/SlurmInfo';


const SlurmInfoContainer: React.FunctionComponent<{
  resource: SimulationResource;
  handleClick: (params: HandleClickParams) => void;
}> = props =>
  <SlurmInfo
    resource={props.resource}
    handleClick={props.handleClick}
  />


export default SlurmInfoContainer;
