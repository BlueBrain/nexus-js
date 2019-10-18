
import React from 'react';

import { DetailedCircuitResource } from '../types';
import { HandleClickParams } from '../../../types';

import BasicInfoContainer from './BasicInfo';


const DetailedCircuitContainer: React.FunctionComponent<{
  resource: DetailedCircuitResource;
  handleClick: (params: HandleClickParams) => void;
}> = props => {

  return (
    <div>
      <BasicInfoContainer
        resource={props.resource}
        handleClick={props.handleClick}
      />
    </div>
  )
}


export default DetailedCircuitContainer;
