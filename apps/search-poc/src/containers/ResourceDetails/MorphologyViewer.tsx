
import * as React from 'react';
import { Spin } from 'antd';
import { Resource } from '@bbp/nexus-sdk';

import useMorphology from '../../hooks/morph';
import { parseProjectUrl } from '../../utils'
import { MINDSResource } from './types';
import MorphologyViewer from '../../components/ResourceDetails/MorphologyViewer';


const MorpologyViewerContainer: React.FunctionComponent<{
  resource: Resource & MINDSResource;
}> = props => {
  const id = props.resource.distribution.contentUrl;
  const [org, proj] = parseProjectUrl(props.resource._project);

  const { morphology, loading, error } = useMorphology({ org, proj, id });

  if (loading) {
    return <Spin></Spin>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return <MorphologyViewer morphology={morphology}/>;
};


export default MorpologyViewerContainer;
