import React, { Suspense } from 'react';
import get from 'lodash/get';
import { useNexus } from '@bbp/react-nexus';
import { Spin } from 'antd';
import moment from 'moment';

import ResourceDetails from '../../components/ResourceDetails';
import ErrorBoundary from '../../components/ErrorBoundary';
import { Resource } from '@bbp/nexus-sdk';
import { getComponentsForTypes } from './index';
import { MINDSResource, Layer } from './types';
import { getLabel, camelToKebab } from '../../utils';


const ResourceDetailsContainer: React.FunctionComponent<{
  selfUrl: string;
}> = props => {
  const { data, loading, error } = useNexus<Resource & MINDSResource>(
    nexus => nexus.httpGet({ path: props.selfUrl }),
    [props.selfUrl],
  );

  const id = get(data, '@id');
  const name = get(data, 'name');
  const description = get(data, 'description');

  const types = get(data, '@type', []) as string[];
  const components = getComponentsForTypes(types);
  const visibleTypes = types.filter(type => type !== 'Entity');

  const brainRegion = {
    id: get(data, 'brainLocation.brainRegion.@id'),
    label: get(data, 'brainLocation.brainRegion.label'),
  };

  const uploadedAt = moment(get(data, '_createdAt')).fromNow();
  const uploadedBy = getLabel(get(data, '_createdBy', ''));

  const species = {
    id: get(data, 'species.@id'),
    label: get(data, 'species.label'),
  };

  const strain = {
    id: get(data, 'strain.@id'),
    label: get(data, 'strain.label'),
  };

  const layers = []
    .concat(get(data, 'brainLocation.layer', []))
    .map((rawLayer: Layer) => ({ id: rawLayer['@id'], label: rawLayer.label }));

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <ResourceDetails
      id={id}
      className={Object.keys(components)
        .map(componentName => `-${camelToKebab(componentName)}`)
        .join(' ')}
      types={visibleTypes}
      name={name}
      description={description}
      brainRegion={brainRegion}
      layers={layers}
      species={species}
      strain={strain}
      uploadedAt={uploadedAt}
      uploadedBy={uploadedBy}
    >
      <ErrorBoundary>
        <Suspense fallback={<Spin />}>
          {Object.keys(components).map((compName: string) => {
            // TODO: FIX
            // @ts-ignore
            const Component = components[compName];
            return (
              <Component
                key={compName}
                resource={data}
              />
            );
          })}
        </Suspense>
      </ErrorBoundary>
    </ResourceDetails>
  );
};

export default ResourceDetailsContainer;
