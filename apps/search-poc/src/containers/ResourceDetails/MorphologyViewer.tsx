import * as React from 'react';
import { Resource } from '@bbp/nexus-sdk';

import useMorphology from '../../hooks/useMorphology';
import { parseProjectUrl } from '../../utils';
import { MINDSResource } from './types';
import MorphologyViewer from '../../components/ResourceDetails/MorphologyViewer';
import { get } from 'lodash';

const MorpologyViewerContainer: React.FunctionComponent<{
  resource: Resource & MINDSResource;
}> = props => {
  const id = get(props, 'resource.distribution.contentUrl');
  const ref = React.useRef<HTMLDivElement>(null);
  const [org, proj] = parseProjectUrl(props.resource._project);
  const { morphology, loading, stage, error } = useMorphology(
    {
      org,
      proj,
      id,
    },
    ref,
  );

  return MorphologyViewer({
    morphology,
    loading,
    stage,
    error,
    ref,
  });
};

export default MorpologyViewerContainer;
