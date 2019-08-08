
import React, { Suspense } from 'react';
import get from 'lodash/get';
import { useNexus } from '@bbp/react-nexus';
import { Spin } from 'antd';

import ResourceDetails from '../../components/ResourceDetails';
import { Resource } from '@bbp/nexus-sdk';
import { MINDSResource } from './types';
import { getComponentsByTypeList } from './index';


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
  const components = getComponentsByTypeList(types);

  if (loading) {
    return <Spin></Spin>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return <ResourceDetails
    id={id}
    name={name}
    description={description}
  >
    {components.map(comp =>
      <Suspense
        key={comp.name}
        fallback={<p>Loading...</p>}
      >
        <comp.Component resource={data}/>
      </Suspense>
    )}
  </ResourceDetails>;
};


export default ResourceDetailsContainer;
