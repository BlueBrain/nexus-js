
import React, { Suspense } from 'react';
import get from 'lodash/get';
import { useNexus } from '@bbp/react-nexus';
import { Spin } from 'antd';

import ResourceDetails from '../../components/ResourceDetails';
import ErrorBoundary from '../../components/ErrorBoundary';
import { Resource } from '@bbp/nexus-sdk';
import { MINDSResource } from './types';
import { getComponentsForTypes } from './index';


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

  if (loading) {
    return <Spin/>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return <ResourceDetails
    id={id}
    name={name}
    description={description}
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
