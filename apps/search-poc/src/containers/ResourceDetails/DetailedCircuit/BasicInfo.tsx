
import React from 'react';

import { DetailedCircuitResource } from '../types';
import { HandleClickParams } from '../../../types';
import BasicInfo from '../../../components/ResourceDetails/DetailedCircuit/BasicInfo';


const BasicInfoContainer: React.FunctionComponent<{
  resource: DetailedCircuitResource;
  handleClick: (params: HandleClickParams) => void;
}> = props => {
  return <BasicInfo
    resource={props.resource}
    handleClick={props.handleClick}
  />
}


export default BasicInfoContainer;
