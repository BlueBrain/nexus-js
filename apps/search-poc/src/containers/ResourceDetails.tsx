import * as React from 'react';
import get from 'lodash/get';
import { useNexus } from '@bbp/react-nexus';
import { Spin } from 'antd';

import ResourceDetails from '../components/ResourceDetails';
import { Resource } from '@bbp/nexus-sdk';

export interface BrainRegion {
  '@id': string;
  label: string;
}

export interface BrainLocation {
  brainRegion: BrainRegion;
}

export interface MINDSResource {
  brainLocation: BrainLocation;
  name: string;
  description: string;
}

const ResourceDetailsContainer: React.FunctionComponent<{
  selfUrl: string;
}> = props => {
  const { data, loading, error } = useNexus<Resource & MINDSResource>(nexus =>
    nexus.httpGet({ path: props.selfUrl }),
  );

  const id = get(data, '@id');
  const name = get(data, 'name');
  const description = get(data, 'description');

  if (loading) {
    return <Spin></Spin>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return <ResourceDetails id={id} name={name} description={description} />;
};

export default ResourceDetailsContainer;
