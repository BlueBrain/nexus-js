import * as React from 'react';
import get from 'lodash/get';
import { useNexus } from '@bbp/react-nexus';
import { Spin } from 'antd';

import DetailsComponent from '../components/Details';
import { Resource } from '@bbp/nexus-sdk';

export interface BrainRegion {
  '@id': string;
  label: string;
}

export interface BrainLocation {
  brainRegion: BrainRegion;
}

export interface MINDSResourse {
  brainLocation: BrainLocation;
  name: string;
  description: string;
}


const DetailsContainer: React.FunctionComponent<{
  selfUrl: string;
}> = props => {
  const { data, loading, error } = useNexus<Resource & MINDSResourse>(nexus => nexus.httpGet({ path: props.selfUrl }));

  const id = get(data, '@id');
  const name = get(data, 'name');
  const description = get(data, 'description');

  const brainRegionId = get(data, 'brainLocation.brainRegion.@id');
  const brainRegionLabel = get(data, 'brainLocation.brainRegion.label');
  const brainRegion = {
    id: brainRegionId,
    label: brainRegionLabel,
  };

  if (loading) {
    return <Spin></Spin>
  }

  if (error) {
    return <p>{error.message}</p>
  }

  return <DetailsComponent
    id={id}
    name={name}
    description={description}
    brainRegion={brainRegion}
  />
};


export default DetailsContainer;
