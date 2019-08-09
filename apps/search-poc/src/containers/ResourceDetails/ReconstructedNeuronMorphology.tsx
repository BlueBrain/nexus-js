
import * as React from 'react';
import { Spin } from 'antd';
import { Resource } from '@bbp/nexus-sdk';

import useMorphology from '../../hooks/morph';
import { MINDSResource } from './types';
import ReconstructedNeuronMorphologyDetails from '../../components/ResourceDetails/ReconstructedNeuronMorphologyDetails';


const ReconstructedNeuronMorphologyDetailsContainer: React.FunctionComponent<{
  resource: Resource & MINDSResource;
}> = props => {
  const id = props.resource.distribution.contentUrl;
  const [, org, proj] = props.resource._project.match(/projects\/([\w-]+)\/([\w-]+)\/?$/) as string[];

  const { morphology, loading, error } = useMorphology({ org, proj, id });

  if (loading) {
    return <Spin></Spin>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return <ReconstructedNeuronMorphologyDetails morphology={morphology}/>;
};


export default ReconstructedNeuronMorphologyDetailsContainer;
