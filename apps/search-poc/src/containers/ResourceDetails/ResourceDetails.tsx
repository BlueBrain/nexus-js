
import React, { Suspense } from 'react';
import get from 'lodash/get';
import { useNexus } from '@bbp/react-nexus';
import { Spin } from 'antd';

import ResourceDetails from '../../components/ResourceDetails';
import ErrorBoundary from '../../components/ErrorBoundary';
import { Resource } from '@bbp/nexus-sdk';
import { getComponentsForTypes } from './index';
import { MINDSResource, Layer } from './types';


const ResourceDetailsContainer: React.FunctionComponent<{
  selfUrl: string;
}> = props => {
  const { data, loading, error } = useNexus<Resource & MINDSResource>(nexus =>
    nexus.httpGet({ path: props.selfUrl }),
  );

  const id = get(data, '@id');
  const name = get(data, 'name');
  const description = get(data, 'description');

  const types = get(data, '@type', []);
  const components = getComponentsForTypes(types);
  const visibleTypes = types.filter(type => type !== 'Entity');

  const brainRegion = {
    id: get(data, 'brainLocation.brainRegion.@id'),
    label: get(data, 'brainLocation.brainRegion.label'),
  };

  const species = {
    id: get(data, 'species.@id'),
    label: get(data, 'species.label'),
  };

  const strain = {
    id: get(data, 'strain.@id'),
    label: get(data, 'strain.label'),
  };

  const layers = [].concat(get(data, 'brainLocation.layer', []))
    .map((rawLayer: Layer) => ({ id: rawLayer['@id'], label: rawLayer.label }));

  if (loading) {
    return <Spin/>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return <ResourceDetails
    id={id}
    types={visibleTypes}
    name={name}
    description={description}
    brainRegion={brainRegion}
    layers={layers}
    species={species}
    strain={strain}
  >
    <ErrorBoundary>
      <Suspense fallback={<Spin/>}>
        {Object.keys(components).map(compName => {
          const Component = components[compName];
          return <Component key={compName} resource={data}/>
        })}
      </Suspense>
    </ErrorBoundary>
  </ResourceDetails>;
};


export default ResourceDetailsContainer;
