
import React from 'react';

import { SimulationResource } from '../types';
import { HandleClickParams } from '../../../types';
import BasicInfo from '../../../components/ResourceDetails/Simulation/BasicInfo';


const BasicInfoContainer: React.FunctionComponent<{
  resource: SimulationResource;
  handleClick: (params: HandleClickParams) => void;
}> = props =>
  <BasicInfo
    resource={props.resource}
    handleClick={props.handleClick}
  />


export default BasicInfoContainer;
