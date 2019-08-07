import * as React from 'react';
import get from 'lodash/get';
import { Resource } from '@bbp/nexus-sdk';
import { MINDSResource } from '../../containers/ResourceDetails';

const BrainRegionContainer: React.FunctionComponent<{
  data: Resource & MINDSResource;
}> = ({ data }) => {
  const brainRegionId = get(data, 'brainLocation.brainRegion.@id');
  const brainRegionLabel = get(data, 'brainLocation.brainRegion.label');
  const brainRegion = {
    id: brainRegionId,
    label: brainRegionLabel,
  };
  return BrainRegionComponent({ brainRegion });
};

const BrainRegionComponent: React.FunctionComponent<{
  brainRegion: {
    id: string;
    label: string;
  };
}> = props => {
  return (
    <p className="brain-region">
      <a href={props.brainRegion.id} rel="noopener noreferrer" target="_blank">
        {props.brainRegion.label}
      </a>
    </p>
  );
};

export default {
  BrainRegion: BrainRegionContainer,
};
