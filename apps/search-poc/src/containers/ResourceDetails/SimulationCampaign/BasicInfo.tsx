
import React from 'react';

import { SimulationCampaignResource } from '../types';
import { HandleClickParams } from '../../../types';
import BasicInfo from '../../../components/ResourceDetails/SimulationCampaign/BasicInfo';


const BasicInfoContainer: React.FunctionComponent<{
  resource: SimulationCampaignResource;
  handleClick: (params: HandleClickParams) => void;
}> = props =>
  <BasicInfo
    resource={props.resource}
    handleClick={props.handleClick}
  />


export default BasicInfoContainer;
